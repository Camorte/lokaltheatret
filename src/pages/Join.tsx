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

    const validateForm = (): ValidationErrors => {
        const newErrors: ValidationErrors = {};
        if (!formData.name) newErrors.name = 'Navn er påkrevd';
        if (!formData.email) {
            newErrors.email = 'E-post er påkrevd';
        } else if (!/^\S+@\S+$/.test(formData.email)) {
            newErrors.email = 'E-post er ugyldig';
        }
        if (!formData.phone) {
            newErrors.phone = 'Telefonnummer er påkrevd';
        } else if (
            formData.phone &&
            !/^(\+47|0047|47)?\d{8}$/.test(formData.phone)
        ) {
            newErrors.phone = 'Telefonnummer er ugyldig';
        }
        if (!Object.values(formData.role).some(Boolean)) {
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
            setFormData((prevData) => ({
                ...prevData,
                role: { ...prevData.role, [name]: checked }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
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
                <div className="fallback-message">
                    <p>
                        Hvis e-posten klienten din ikke åpner seg automatisk,
                        vennligst kopier følgende informasjon og send det til
                        oss. Takk!
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
        } else {
            setErrors(validationErrors);
            setFallbackMessage(null);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            {joinPage && !isLoading && (
                <>
                    <div className="relative">
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
                        <div className="relative w-full h-full max-h-[60vh] object-cover">
                            {joinPage.joinPageBannerImg && (
                                <img
                                    src={urlFor(
                                        joinPage.joinPageBannerImg
                                    ).url()}
                                    alt={joinPage.joinPageBannerImg.altText}
                                />
                            )}
                        </div>
                    </div>

                    <section className="w-3/4 mt-16">
                        <PortableText
                            value={joinPage.content}
                            components={PortableTextComponent}
                        />

                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label htmlFor="name">Navn</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                aria-invalid={errors.name ? 'true' : 'false'}
                            />
                            {errors.name && (
                                <p role="alert" className="error">
                                    {errors.name}
                                </p>
                            )}

                            <label htmlFor="phone">Telefon</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            {errors.phone && (
                                <p role="alert" className="error">
                                    {errors.phone}
                                </p>
                            )}

                            <label htmlFor="email">E-post</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            {errors.email && (
                                <p role="alert" className="error">
                                    {errors.email}
                                </p>
                            )}

                            <fieldset>
                                <legend>Rolle (velg minst én)</legend>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="stage"
                                        checked={formData.role.stage}
                                        onChange={handleChange}
                                    />
                                    {roleDisplayNames.stage}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="costumes"
                                        checked={formData.role.costumes}
                                        onChange={handleChange}
                                    />
                                    {roleDisplayNames.costumes}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="builder"
                                        checked={formData.role.builder}
                                        onChange={handleChange}
                                    />
                                    {roleDisplayNames.builder}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="other"
                                        checked={formData.role.other}
                                        onChange={handleChange}
                                    />
                                    {roleDisplayNames.other}
                                </label>
                            </fieldset>
                            {errors.role && (
                                <p role="alert" className="error">
                                    {errors.role}
                                </p>
                            )}

                            <label htmlFor="message">Melding</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                maxLength={280}
                            ></textarea>

                            <button type="submit">Send</button>

                            {fallbackMessage}
                        </form>
                    </section>
                </>
            )}
        </main>
    );
};

export default Join;
