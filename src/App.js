import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [tag, setTag] = useState("consectetur");
  const [inputvalue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://6cw4vl6ty7.execute-api.ap-northeast-1.amazonaws.com/dev")
      .then((r) => r.json())
      .then((r) => {
        setData(r.body.data);
        setSearch(r.body.data);
      })
      .catch((e) => console.error(e));
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
    let searchv = data.filter((i) => i.DeviceID.includes(e.target.value));
    if (searchv.length === 0) {
      if (e.target.value === "") {
        setSearch(data);
      } else {
        setSearch(searchv);
      }
    } else {
      setSearch(searchv);
    }
  }
  return (
    <div className="App">
      <input
        type="text"
        value={inputvalue}
        onChange={handleChange}
        onPaste={handleChange}
      />
      <select onChange={(e) => setTag(e.target.value)}>
        {data &&
          data[0].Tags.map((i, ix) => (
            <option value={i} key={ix}>
              {i}
            </option>
          ))}
      </select>

      <table>
        <tr>
          <th>CameraType</th>
          <th>DeviceID</th>
          <th>LastActivityTime</th>
          <th>SnapshotSignedUrl</th>
          <th>Tags</th>
        </tr>

        {search.length != 0 &&
          search.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.CameraType}</td>
                <td>{item.DeviceID}</td>
                <td>{item.LastActivityTime}</td>
                <td>
                  <img src={item.SnapshotSignedUrl} width="100px" />
                </td>
                <td>{item.Tags.map((i) => i + ",")}</td>
              </tr>
            );
          })}
      </table>
      {search.length === 0 && <h1>No data</h1>}
      {!data && <h1>No data</h1>}
    </div>
  );
}

export default App;
