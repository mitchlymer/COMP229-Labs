import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import ReferenceCard from "../components/ReferenceCard";

function References() {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadReferences = async () => {
            try {
                const result = await apiRequest("/references");
                setReferences(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadReferences();
    }, []);

    return (
        <section className="references-page">
            <h1>References</h1>

            <p className="page-intro">
                Below are sample testimonials that represent feedback from academic
                and project-based work.
            </p>

            {loading && <p>Loading references...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && references.length === 0 && (
                <p>No references were found.</p>
            )}

            {!loading && !error && references.length > 0 && (
                <div className="references-grid">
                    {references.map((reference) => (
                        <ReferenceCard
                            key={reference.id}
                            name={reference.name}
                            company={reference.company}
                            position={reference.position}
                            testimonial={reference.testimonial}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default References;