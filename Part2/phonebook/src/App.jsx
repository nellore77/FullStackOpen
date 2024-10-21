import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";
import phoneService from "./services/phonebook.js";
import { Notification } from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPersons] = useState(persons); // Separate state for filtered data

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const [success, setSuccess] = useState("");

  const [isError, setIsError] = useState();

  /* const handleNoteChange = (event) => {
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
  }; */

  /*  const addName = (event) => {
    console.log("addName");

    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    console.log("persons ", persons);

    const personExists = persons.some(
      (person) => person.name === nameObject.name
    );
    if (personExists) {
      window.alert(`${nameObject.name} is already in the phonebook`);
    } else {
      handleSetPerson(nameObject);
    }
    setNewName("");
    setNewNumber(0);
  }; */

  /* const handleSetPerson = (nameObject) => {
    console.log("handleSetPerson");

    const newPersons = [...persons, nameObject];
    setPersons(newPersons);
    setFilteredPersons(newPersons); // Update both original and filtered lists
  };
 */

  /*  const filterNames = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm)
      );
      setFilteredPersons(filtered); // Update only the filtered list
    } else {
      setFilteredPersons(persons); // Reset to original if filter is cleared
    }
  }; */

  const hook = () => {
    console.log("effect");
    phoneService.getAll().then((initialData) => {
      setPersons(initialData);
      setFilteredPersons(initialData);
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <h2>Phone-book</h2>
      {success && <Notification success={success} isError={isError}/>}
      <div>
        <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
        {/* When success is falsy, the component will not be rendered, so no
        notification is displayed */}
      </div>
      <h2>add New</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setSuccess={setSuccess}
      />{" "}
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
        setFilteredPersons={setFilteredPersons}
        setSuccess={setSuccess}
        setIsError={setIsError}

      />
    </div>
  );
};

export default App;
