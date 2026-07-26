import { useEffect, useState } from "react";
import { apiRequest } from "../../api/api";

function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        completion: "",
        description: "",
        image: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const result = await apiRequest("/projects");
                setProjects(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (project) => {
        setEditingId(project.id);

        setFormData({
            title: project.title,
            completion: project.completion
                ? project.completion.substring(0, 10)
                : "",
            description: project.description,
            image: project.image
        });

        setError("");
        setSuccessMessage("");
    };

    const handleDelete = async (projectId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccessMessage("");

        try {
            await apiRequest(`/projects/${projectId}`, {
                method: "DELETE"
            });

            setProjects(
                projects.filter((project) => project.id !== projectId)
            );

            setSuccessMessage("Project deleted successfully.");
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
                await apiRequest(`/projects/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(formData)
                });

                setProjects(
                    projects.map((project) =>
                        project.id === editingId
                            ? {
                                ...project,
                                title: formData.title,
                                completion: formData.completion,
                                description: formData.description,
                                image: formData.image
                            }
                            : project
                    )
                );

                setEditingId(null);
                setSuccessMessage("Project updated successfully.");
            } else {
                const result = await apiRequest("/projects", {
                    method: "POST",
                    body: JSON.stringify(formData)
                });

                setProjects([...projects, result.data]);
                setSuccessMessage("Project added successfully.");
            }

            setFormData({
                title: "",
                completion: "",
                description: "",
                image: ""
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="admin-page">
            <h1>Manage Projects</h1>

            <p className="page-intro">
                Add, view, edit, or delete the projects stored in the portfolio
                database.
            </p>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit Project" : "Add Project"}</h2>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="completion">Completion Date</label>
                    <input
                        type="date"
                        id="completion"
                        name="completion"
                        value={formData.completion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting
                        ? "Saving..."
                        : editingId
                        ? "Update Project"
                        : "Add Project"}
                </button>
            </form>

            {successMessage && (
                <p className="success-message">{successMessage}</p>
            )}

            {loading && <p>Loading projects...</p>}

            {error && <p className="error-message">{error}</p>}

            {!loading && !error && projects.length === 0 && (
                <p>No projects were found.</p>
            )}

            {!loading && !error && projects.length > 0 && (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Completion Date</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.title}</td>
                                    <td>
                                        {project.completion
                                            ? project.completion.substring(0, 10)
                                            : ""}
                                    </td>
                                    <td>{project.description}</td>
                                    <td>{project.image}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(project)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(project.id)}
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

export default AdminProjects;