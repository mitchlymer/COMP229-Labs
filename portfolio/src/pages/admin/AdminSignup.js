import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api/api';

function AdminSignup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSubmitting(true);
            setError('');
            setMessage('');

            const result = await apiRequest('/users', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            setMessage(
                result.message ||
                'Account created successfully. You can now sign in.'
            );

            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="admin-page">
            <h1>Sign Up</h1>

            <p className="page-intro">
                Create an account to access the Admin Dashboard.
            </p>

            {error && (
                <p className="error-message" data-cy="signup-error">
                    {error}
                </p>
            )}

            {message && (
                <p className="success-message" data-cy="signup-success">
                    {message}
                </p>
            )}

            <form
                className="admin-form"
                onSubmit={handleSubmit}
                data-cy="signup-form"
            >
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        data-cy="signup-firstname"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={formData.lastname}
                        onChange={handleChange}
                        data-cy="signup-lastname"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        data-cy="signup-email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        data-cy="signup-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    data-cy="signup-submit"
                    disabled={submitting}
                >
                    {submitting ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="page-intro">
                Already have an account?{' '}
                <Link to="/admin/login">Sign In</Link>
            </p>
        </main>
    );
}

export default AdminSignup;