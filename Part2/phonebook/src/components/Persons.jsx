import phoneService from "../services/phonebook";

export const Persons = ({
  persons,
  setPersons,
  setFilteredPersons,
  setSuccess,
  setIsError,
}) => {
  const handleDelete = (deletePerson) => {
    if (
      window.confirm(`Are you sure you want to delete ${deletePerson.name}?`)
    ) {
      phoneService
        .deletePerson(deletePerson.id)
        .then(() => {
          handleSuccess(
            `Note: '${deletePerson.name}' is removed from server`,
            true
          );
          updatePersonsState(deletePerson.id);
        })
        .catch((error) => {
          handleSuccess(
            `Note: '${deletePerson.name}' was already removed from server`,
            false
          );
          updatePersonsState(deletePerson.id);
        });
    }
  };

  const handleSuccess = (message, isError) => {
    setSuccess(message);
    setIsError(isError);
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const updatePersonsState = (idToRemove) => {
    const newPersons = persons.filter((person) => person.id !== idToRemove);
    setPersons(newPersons);
    setFilteredPersons(newPersons);
  };

  return (
    <div>
      {persons.map((person, index) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>Delete</button>
          </p>
        );
      })}
    </div>
  );
};
