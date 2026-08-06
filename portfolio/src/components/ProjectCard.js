import { memo } from "react";

function ProjectCard({
    title,
    description,
    image,
    completionDate,
    loadImmediately
}) {
    const isImageUrl =
        image &&
        (image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("/"));

    return (
        <article className="project-card">
            <div className="project-image">
                {isImageUrl ? (
                    <img
                        src={image}
                        alt={`${title} project`}
                        loading={loadImmediately ? "eager" : "lazy"}
                        decoding="async"
                        width="400"
                        height="160"
                    />
                ) : (
                    <span>{image || "Project Image"}</span>
                )}
            </div>

            <h2>{title}</h2>
            <p>{description}</p>

            <p className="completion-date">
                Completion Date: {completionDate}
            </p>
        </article>
    );
}

export default memo(ProjectCard);