import { useForm } from 'react-hook-form';

type FormData = {
    name: string;
    phone?: string;
    email: string;
    role: {
        stage: boolean;
        costumes: boolean;
        builder: boolean;
        other: boolean;
    };
    message: string;
};

const Join = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<FormData>();

    const roles = [
        { title: 'stage', value: 'Stå på scenen' },
        { title: 'costumes', value: 'Lage kostymer' },
        { title: 'builder', value: 'Lage scenografi/rekvisitter' },
        { title: 'other', value: 'Annet' }
    ];
    const atLeastOne = () => (getValues('role').length ? true : false);

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            <h1>Bli med</h1>

            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Navn</label>
                <input
                    {...register('name', { required: true })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name?.type === 'required' && (
                    <p role="alert">Navn er påkrevd</p>
                )}

                <label htmlFor="phone">Telefon</label>
                <input
                    type="tel"
                    {...register('phone', {
                        pattern: /^(\+47|0047|47)?\d{8}$/
                    })}
                />

                <label htmlFor="email">E-post</label>
                <input
                    type="email"
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email?.type === 'required' && (
                    <p role="alert">E-post er påkrevd</p>
                )}

                <fieldset>
                    <legend>Hva vil du gjøre?</legend>
                    {roles.map((role) => (
                        <label key={role.title}>
                            <input
                                type="checkbox"
                                {...register(`role.${role.title}`)}
                            />
                            {role.value}
                        </label>
                    ))}
                </fieldset>

                <label htmlFor="message">Melding</label>
                <textarea
                    id="message"
                    {...register('message', { maxLength: 280 })}
                ></textarea>

                <button type="submit">Send</button>
            </form>
        </main>
    );
};

export default Join;
