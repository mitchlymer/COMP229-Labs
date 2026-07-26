import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";

function AdminReferences() {
    const [references, setReferences] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        company: "",
        testimonial: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (reference) => {
        setEditingId(reference.id);

        setFormData({
            name: reference.name,
            position: reference.position,
            company: reference.company,
            testimonial: reference.testimonial
        });

        setError("");
        setSuccessMessage("");
    };

    const handleDelete = async (referenceId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reference?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccessMessage("");

        try {
            await apiRequest(`/references/${referenceId}`, {
                method: "DELETE"
            });

            setReferences(
                references.filter(
                    (reference) => reference.id !== referenceId
                )
            );

            setSuccessMessage("Reference deleted successfully.");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            if (editingId) {
                await apiRequest(`/references/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(formData)
                });

                setReferences(
                    references.map((reference) =>
                        reference.id === editingId
                            ? {
                                ...reference,
                                name: formData.name,
                                position: formData.position,
                                company: formData.company,
                                testimonial: formData.testimonial
                            }
                            : reference
                    )
                );

                setEditingId(null);
                setSuccessMessage("Reference updated successfully.");
            } else {
                const result = await apiRequest("/references", {
                    method: "POST",
                    body: JSON.stringify(formData)
                });

                setReferences([...references, result.data]);
                setSuccessMessage("Reference added successfully.");
            }

            setFormData({
                name: "",
                position: "",
                company: "",
                testimonial: ""
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="admin-page">
            <h1>Manage References</h1>

            <p className="page-intro">
                Add, view, edit, or delete the references stored in the
                portfolio database.
            </p>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit Reference" : "Add Reference"}</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="testimonial">Testimonial</label>
                    <textarea
                        id="testimonial"
                        name="testimonial"
                        value={formData.testimonial}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Saving..."
                        : editingId
                        ? "Update Reference"
                        : "Add Reference"}
                </button>
            </form>

            {successMessage && (
                <p className="success-message">{successMessage}</p>
            )}

            {loading && <p>Loading references...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && references.length === 0 && (
                <p>No references were found.</p>
            )}

            {!loading && !error && references.length > 0 && (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Company</th>
                                <th>Testimonial</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {references.map((reference) => (
                                <tr key={reference.id}>
                                    <td>{reference.name}</td>
                                    <td>{reference.position}</td>
                                    <td>{reference.company}</td>
                                    <td>{reference.testimonial}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(reference)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(reference.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default AdminReferences;