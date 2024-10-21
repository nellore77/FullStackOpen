import phoneService from "../services/phonebook";
export const PersonForm = (props) => {
  const {
    persons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    setPersons,
    setFilteredPersons,
    setSuccess,
    setIsError,
  } = props;

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    if (!Number(event.target.value)) {
      window.alert(`Enter only numeric values`);
      return;
    }
    setNewNumber(Number(event.target.value));
  };

  const addName = (event) => {
    console.log("addName");

    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    console.log("persons ", persons);

    const personExists = persons.find(
      (person) => person.name === nameObject.name
    );

    if (personExists) {
      const confirmUpdate = window.confirm(
        `${nameObject.name} is already in the phonebook. Do you want to update the number?`
      );

      if (confirmUpdate) {
        // If "Yes" (OK) is clicked, call updateSetPerson
        updateSetPerson(personExists.id, nameObject);
      } else {
        // If "No" (Cancel) is clicked, do nothing
        return;
      }
    } else {
      addSetPerson(nameObject);
    }
    setNewName("");
    setNewNumber(0);
  };

  const updateSetPerson = (id, newObject) => {
    phoneService
      .updatePerson(id, newObject)
      .then((returnedPhone) => {
        const newPersons = persons.map((person) => {
          return person.id === id ? returnedPhone : person;
        });
        setSuccess(`Added ${newName}`);

        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setIsError(true);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      })
      .catch((error) => {
        setSuccess(` Note: '${newName}' was already removed from server`);
        setIsError(false);
        const newPersons = persons.map((person) => {
          return person.id === id ? returnedPhone : person;
        });

        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      });
  };

  const addSetPerson = (nameObject) => {
    phoneService.create(nameObject).then((returnedPhone) => {
      // returnedPhone now contains the person object with the generated id
      const newPersons = [...persons, returnedPhone];
      setPersons(newPersons);
      setFilteredPersons(newPersons);
      setSuccess(`Added ${newName}`);
      setIsError(true);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    });
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNoteChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
};
