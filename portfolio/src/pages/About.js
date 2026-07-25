import ProfilePicture from "../assets/images/profile.jpg";
import Resume from "../assets/resume/Mitch_Lymer_Resume.pdf";

function About() {
    return (
        <section className="about-page">

            <h1>About Me</h1>

            <div className="profile-image">
                <img
                    src={ProfilePicture}
                    alt="Profile"
                    className="profile-picture"
                />
            </div>

            <h2>Mitch Lymer</h2>

            <p>
                I am currently studying Software Engineering Technology and Web Application Development. I am an Application & Technology Support Specialist at the City of Toronto. 
                I am enjoying learning React, Java, C#, SQL, MongoDB, Node.js, and scripting in Powershell.
            </p>

            <p>
                My end goal is to become a developer, particularly for Web Applications. My short term goal is to build projects with the skills I have learned. 
                In my spare time, I enjoy hiking, playing chess, and going to the movies.
            </p>

            <a
                href={Resume}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
            >
                View Resume
            </a>

        </section>
    );
}

export default About;