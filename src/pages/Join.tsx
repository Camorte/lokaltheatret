import { useState, useEffect } from 'react';
import { getJoinPage, urlFor } from '../lib/sanity';
import { JoinPage } from '../lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent';

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
    role: {
        stage: boolean;
        costumes: boolean;
        builder: boolean;
        other: boolean;
    };
}

interface ValidationErrors {
    name?: string;
    phone?: string;
    email?: string;
    role?: string;
}

const roleDisplayNames: Record<keyof FormData['role'], string> = {
    stage: 'Stå på scenen',
    costumes: 'Lage kostymer',
    builder: 'Lage scenografi / rekvisitter',
    other: 'Annet (beskriv i meldingen under)'
};

const Join = () => {
    const [joinPage, setJoinPage] = useState<JoinPage>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getJoinPage()
            .then((response: JoinPage) => {
                setJoinPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        message: '',
        role: {
            stage: false,
            costumes: false,
            builder: false,
            other: false
        }
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [fallbackMessage, setFallbackMessage] = useState<JSX.Element | null>(
        null
    );
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const validateForm = (data: FormData): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        if (!data.name) newErrors.name = 'Navn er påkrevd';
        if (!data.email) {
            newErrors.email = 'E-post er påkrevd';
        } else if (!/^\S+@\S+$/.test(data.email)) {
            newErrors.email = 'E-post er ugyldig';
        }
        if (!data.phone) {
            newErrors.phone = 'Telefonnummer er påkrevd';
        } else if (data.phone && !/^(\+47|0047|47)?\d{8}$/.test(data.phone)) {
            newErrors.phone = 'Telefonnummer er ugyldig';
        }
        if (!Object.values(data.role).some(Boolean)) {
            newErrors.role = 'Du må velge minst ett alternativ for rolle';
        }
        return newErrors;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prevData) => {
                const updatedRole = { ...prevData.role, [name]: checked };
                const newErrors = validateForm({
                    ...prevData,
                    role: updatedRole
                });
                setErrors(newErrors);
                setIsSubmitDisabled(Object.keys(newErrors).length > 0);
                return { ...prevData, role: updatedRole };
            });
        } else {
            setFormData({ ...formData, [name]: value });

            const newErrors = validateForm({ ...formData, [name]: value });
            setErrors(newErrors);
            setIsSubmitDisabled(Object.keys(newErrors).length > 0);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            const selectedRoles = Object.keys(formData.role)
                .filter(
                    (role) => formData.role[role as keyof typeof formData.role]
                )
                .map((role) => roleDisplayNames[role as keyof FormData['role']])
                .join(', ');

            const toEmail = 'hei@lokaltheatret.no';
            const subject = `${formData.name} har lyst til å bli med i Lokaltheatret!`;

            const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=Navn: ${formData.name}%0D%0ATelefon: ${formData.phone}%0D%0AE-post: ${formData.email}%0D%0ARoller: ${selectedRoles}%0D%0AMelding: ${formData.message}`;
            window.location.href = mailtoLink;

            setFallbackMessage(
                <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
                    <p>
                        Hvis e-posten klienten din ikke åpner seg automatisk,
                        vennligst kopier følgende informasjon og send det til{' '}
                        {toEmail}. Takk!
                    </p>
                    <strong>Til:</strong> {toEmail}
                    <br />
                    <strong>Emne:</strong> {subject}
                    <br />
                    <strong>Innhold:</strong>
                    <p>
                        Navn: {formData.name}
                        <br />
                        Telefon: {formData.phone}
                        <br />
                        E-post: {formData.email}
                        <br />
                        Roller: {selectedRoles}
                        <br />
                        Melding: {formData.message}
                    </p>
                </div>
            );

            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                role: {
                    stage: false,
                    costumes: false,
                    builder: false,
                    other: false
                }
            });
            setErrors({});
            setIsSubmitDisabled(true);
        } else {
            setErrors(validationErrors);
            setFallbackMessage(null);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            {joinPage && !isLoading && (
                <>
                    <div className="relative w-full h-[80vh]">
                        <div
                            className="absolute w-fit p-2 z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
                            style={{
                                backgroundColor: joinPage.bannerColor
                            }}
                        >
                            <h1 className="font-bold text-2xl max-w-[200px] md:text-4xl md:max-w-[300px]">
                                {joinPage.title}
                            </h1>
                        </div>
                        {joinPage.joinPageBannerImg && (
                            <img
                                className="relative w-full h-full max-h-[80vh] object-cover"
                                src={urlFor(joinPage.joinPageBannerImg).url()}
                                alt={joinPage.joinPageBannerImg.altText}
                            />
                        )}
                    </div>

                    <section className="w-4/5 md:w-2/4 mt-16">
                        <PortableText
                            value={joinPage.content}
                            components={PortableTextComponent}
                        />

                        <form
                            className="flex flex-col space-y-4 mt-16"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Navn
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    aria-invalid={
                                        errors.name ? 'true' : 'false'
                                    }
                                />
                                {errors.name && (
                                    <p
                                        role="alert"
                                        className="text-red-600 text-sm"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    aria-invalid={
                                        errors.phone ? 'true' : 'false'
                                    }
                                />
                                {errors.phone && (
                                    <p
                                        role="alert"
                                        className="text-red-600 text-sm"
                                    >
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    E-post
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    aria-invalid={
                                        errors.email ? 'true' : 'false'
                                    }
                                />
                                {errors.email && (
                                    <p
                                        role="alert"
                                        className="text-red-600 text-sm"
                                    >
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <fieldset className="space-y-2">
                                <legend className="block text-sm font-medium text-gray-700">
                                    Rolle (velg minst én)
                                </legend>
                                {Object.keys(formData.role).map((role) => (
                                    <label
                                        key={role}
                                        className="flex items-center text-base"
                                    >
                                        <input
                                            type="checkbox"
                                            name={role}
                                            checked={
                                                formData.role[
                                                    role as keyof FormData['role']
                                                ]
                                            }
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        {
                                            roleDisplayNames[
                                                role as keyof FormData['role']
                                            ]
                                        }
                                    </label>
                                ))}
                            </fieldset>
                            {errors.role && (
                                <p
                                    role="alert"
                                    className="text-red-600 text-sm"
                                >
                                    {errors.role}
                                </p>
                            )}

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Melding
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    maxLength={280}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                ></textarea>
                            </div>

                            {fallbackMessage}

                            <button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className={`mt-4 w-full font-bold py-2 rounded-md shadow ${isSubmitDisabled ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            >
                                Send
                            </button>
                        </form>
                    </section>
                </>
            )}
        </main>
    );
};

export default Join;
