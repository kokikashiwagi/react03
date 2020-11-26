import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { db } from "./firebase";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
const App = () => {
  // 1.記述
  const [data, setData] = useState([{ id: "", title: "", contents: "" }]);
  // 記述登録1
  const [inputValue, setInputValue] = useState("");
  const [Cont, setCont] = useState("");
  //２個以上やるときは行を追加する、送るときはオブジェクトなので追加不要

  // 記述登録２
  const handleInputChange = (e) => {
    console.log(e, "event");
    setInputValue(e.target.value); //inputValueに値を書き込む（更新）
  };

 const addInputData = () => {
   db.collection("group").add({ title: inputValue});
   setInputValue("");
 };

   // Contents start
 const handleCont = (ee) => {
  console.log(ee, "event2");
  setCont(ee.target.value); //inputValueに値を書き込む（更新）
};


 const addInputCont = () => {
  db.collection("group").add({ contents: Cont});
  setCont("");
};
   // Contents end


  // 2.記述
  useEffect(() => {
    const firebaseData = db.collection("group")
    .orderBy("title", "asc").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          title: dbData.data().title,
          contents: dbData.data().contents
        }))
      );
    });
    return () => firebaseData();
  }, []); //←ここに最後一つ書きたします
  // // ここに記述,useStateで作ったdata変数をコンソールログで表示
  // console.log(data);
  return (
    <div>
      <h1>一言タイトル</h1>
      {/* 登録の処理 */}
      <FormControl>
        {/* inputタグ */}
        <TextField
          label="タイトル追加"
          value={inputValue}
          onChange={handleInputChange}
        />
        
         {/* <TextField
          label="コンテンツ追加"
          value={Cont}
          onChange={handleCont}
          /> */}
      </FormControl>

      <button
       disabled={!inputValue}
       onClick={addInputData}
      //  disabled={!Cont}
      //  onClick={addInputCont}
      >
      <FlightTakeoffIcon fontSize="large" color="secondary"/>
      </button>


      {/* dataっていう変数のなかに全てのデータが入っているのでmapを使って展開 */}
      {data.map((dataItem) => (
        <div key={dataItem.id}>
          {/* <h1>{dataItem.title}</h1> */}
          <TaskItem id={dataItem.id} title={dataItem.title} contents={dataItem.contents}/>
          {/* <h2>{dataItem.contents}</h2> */}
        </div>
      ))}
    </div>
  );
};
export default App;