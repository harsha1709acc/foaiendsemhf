export function PeopleInSpace({ data }) {
  if (!data) return null;

  return (
    <div className="people-in-space">
      <div className="people-header">
        <span className="people-icon">👨‍🚀</span>
        <h3>People in Space Right Now</h3>
        <span className="people-count">{data.number}</span>
      </div>
      <div className="people-list">
        {data.people?.map((person, i) => (
          <div key={i} className="person-chip">
            <span className="person-name">{person.name}</span>
            <span className="person-craft">{person.craft}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
