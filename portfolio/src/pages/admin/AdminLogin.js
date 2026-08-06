import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, setAuthToken } from "../../api/api";

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            const result = await apiRequest("/users/signin", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            setAuthToken(result.data.token);
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="admin-page">
            <h1>Admin Sign In</h1>

            <p className="page-intro">
                Sign in to manage the portfolio database.
            </p>

            <form
                className="admin-form"
                onSubmit={handleSubmit}
                data-cy="signin-form"
            >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        data-cy="signin-email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        data-cy="signin-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    data-cy="signin-submit"
                    disabled={submitting}
                >
                    {submitting ? "Signing In..." : "Sign In"}
                </button>
            </form>

            {error && (
                <p className="error-message" data-cy="signin-error">
                    {error}
                </p>
            )}

            <p className="page-intro">
                Don&apos;t have an account?{" "}
                <Link to="/admin/signup">Create an account</Link>
            </p>
        </main>
    );
}

export default AdminLogin;