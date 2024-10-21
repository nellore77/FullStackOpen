export const Filter = (props) => {
const {persons, setFilteredPersons}= props;

  const filterNames = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm)
      );
      setFilteredPersons(filtered); // Update only the filtered list
    } else {
      setFilteredPersons(persons); // Reset to original if filter is cleared
    }
  };


  return (
    <div>
      Filter shown with : <input onChange={filterNames} />
    </div>
  );
};
