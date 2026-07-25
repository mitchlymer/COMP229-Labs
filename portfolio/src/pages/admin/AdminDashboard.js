import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <main className="admin-page">
            <h1>Admin Dashboard</h1>

            <p className="page-intro">
                Manage the users, projects, services, and references stored in
                the portfolio database.
            </p>

            <div className="admin-grid">
                <Link to="/admin/users" className="admin-card">
                    <h2>Users</h2>
                    <p>Add, view, edit, or delete portfolio users.</p>
                </Link>

                <Link to="/admin/projects" className="admin-card">
                    <h2>Projects</h2>
                    <p>Add, view, edit, or delete portfolio projects.</p>
                </Link>

                <Link to="/admin/services" className="admin-card">
                    <h2>Services</h2>
                    <p>Add, view, edit, or delete portfolio services.</p>
                </Link>

                <Link to="/admin/references" className="admin-card">
                    <h2>References</h2>
                    <p>Add, view, edit, or delete portfolio references.</p>
                </Link>
            </div>
        </main>
    );
}

export default AdminDashboard;