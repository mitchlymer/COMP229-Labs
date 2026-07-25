import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        emailAddress: "",
        message: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Contact Form Submitted:", formData);

        alert("Thank you. Returning to the Home page.");

        navigate("/");
    }

    return (
        <section className="contact-page">
            <h1>Contact Me</h1>

            <div className="contact-container">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Name:</strong> Mitch Lymer</p>
                    <p><strong>Email:</strong> mitchlymer@gmail.com</p>
                    <p><strong>Location:</strong> Toronto, Ontario</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label>Contact Number</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                    />

                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="primary-button">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;