function ReferenceCard({ name, company, position, testimonial }) {
    return (
        <div className="reference-card">
            <p className="testimonial">"{testimonial}"</p>

            <h2>{name}</h2>
            <p>{position}</p>
            <p>{company}</p>
        </div>
    );
}

export default ReferenceCard;