function ProjectCard({ title, description, image, completionDate }) {
    return (
        <div className="project-card">
            <div className="project-image">
                {image}
            </div>

            <h2>{title}</h2>
            <p>{description}</p>
            <p className="completion-date">
                Completion Date: {completionDate}
            </p>
        </div>
    );
}

export default ProjectCard;