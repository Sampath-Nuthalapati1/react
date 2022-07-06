import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col} from "react-bootstrap"

function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });
  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "",
    },
  ]);

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post("/newitem", newItem);
    console.log(newItem);
    alert("item added");

    setItem({
      title: "",
      description: "",
    });
  }

  function deleteItem(id) {
    axios.delete("/delete/" + id);
    alert("item deleted");
    console.log(`Deleted item with id ${id}`);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("item updated");
    setIsPut(false);
    console.log(`item with id ${id} updated`);
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(updatedItem);
  }

  return (
    <div className="App">
      {!isPut ? (


      <div className="main">
          <input
            onChange={handleChange}
            name="title"
            value={item.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleChange}
            name="description"
            value={item.description}
            placeholder="description"
          ></input>
          <Button variant="primary" onClick={addItem}>ADD ITEM</Button>
        </div>




      ) : (
        <div className="main">
          <input
            onChange={handleUpdate}
            name="title"
            value={updatedItem.title}
            placeholder="title"
          ></input>
          <input
            onChange={handleUpdate}
            name="description"
            value={updatedItem.description}
            placeholder="description"
          ></input>
          <Button variant="primary" onClick={() => updateItem(updatedItem.id)}>UPDATE ITEM</Button>
        </div>
      )}
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{ background: "LightGray", width: "40%", top: "100%", margin: "auto auto"}}
          >
            {/* <Container>
              <Row>
                <Col><p>{item.title}</p></Col>
                <Col><p>{item.description}</p></Col>
                <Col><Button variant="warning" onClick={() => openUpdate(item._id)}>UPDATE</Button></Col>
                <Col><Button variant="danger" onClick={() => deleteItem(item._id)}>Delete</Button></Col>
              </Row>
            </Container> */}
            <div>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <Button variant="warning" onClick={() => openUpdate(item._id)}>UPDATE</Button>
              <Button variant="danger" onClick={() => deleteItem(item._id)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;