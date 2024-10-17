const Join = () => {
    // Add a form here for contact information

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            <h1>Bli med</h1>

            <form className="flex flex-col">
                <label htmlFor="name">Navn</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="phone">Telefon</label>
                <input type="tel" id="phone" name="phone" />

                <label htmlFor="email">E-post</label>
                <input type="email" id="email" name="email" />

                <fieldset>
                    <legend>Hva vil du gjøre?</legend>

                    <div>
                        <input
                            type="checkbox"
                            id="stage"
                            name="stage"
                            checked
                        />
                        <label htmlFor="stage">Stå på scenen</label>
                    </div>

                    <div>
                        <input type="checkbox" id="costumes" name="costumes" />
                        <label htmlFor="costumes">Lage kostymer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="builder" name="builder" />
                        <label htmlFor="builder">
                            Lage scenografi/rekvisitter
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="other" name="other" />
                        <label htmlFor="other">
                            Annet(skriv i tekstfeltet)
                        </label>
                    </div>
                </fieldset>

                <label htmlFor="message">Melding</label>
                <textarea id="message" name="message"></textarea>
                <button type="submit">Send</button>
            </form>
        </main>
    );
};

export default Join;
