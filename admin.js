let db;
const request = indexedDB.open("BookingDB", 1);

request.onsuccess = function (e) {
  db = e.target.result;
  displayData();
};

function displayData() {
  const transaction = db.transaction(["bookings"], "readonly");
  const store = transaction.objectStore("bookings");
  const request = store.openCursor();
  const table = document.getElementById("data");

  table.innerHTML = "";

  request.onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      const b = cursor.value;

      table.innerHTML += `
        <tr>
          <td>${b.id}</td>
          <td>${b.name}</td>
          <td>${b.city}</td>
          <td>${b.state}</td>
          <td>${b.date}</td>
          <td>${b.mobile}</td>
          <td>${b.request}</td>
          <td>${b.time}</td>
        </tr>
      `;
      cursor.continue();
    }
  };
}
