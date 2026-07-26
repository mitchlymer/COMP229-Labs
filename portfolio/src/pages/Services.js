import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import ServiceCard from "../components/ServiceCard";

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadServices = async () => {
            try {
                const result = await apiRequest("/services");
                setServices(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    return (
        <section className="services-page">
            <h1>Services</h1>

            <p className="page-intro">
                Below are some of the skills and services that I am developing.
            </p>

            {loading && <p>Loading services...</p>}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!loading && !error && services.length === 0 && (
                <p>No services were found.</p>
            )}

            {!loading && !error && services.length > 0 && (
                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Services;