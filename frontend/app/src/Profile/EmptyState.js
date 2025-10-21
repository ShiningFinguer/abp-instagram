export function EmptyState({ icon, title, description, action }) {
    return (
      <div className="empty-state">
        <div className="empty-icon">{icon}</div>
        <h2 className="empty-title">{title}</h2>
        <p className="empty-description">{description}</p>
        {action && <button className="share-button">{action}</button>}
      </div>
    );
  }
  