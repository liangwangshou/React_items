import React from "react";

const MessageAll = [
  { id: 1, title: "message001", content: "第一只土豆" },
  { id: 2, title: "message002", content: "第二只土豆" },
  { id: 3, title: "message003", content: "第三只土豆" },
];
export default function MessageDetail(props) {
  console.log(props);
  const { id } = props.match.params;
  const message = MessageAll.find((msg) => id * 1 === msg.id);

  return (
    <ul>
      <li>id:{message.id}</li>
      <li>title:{message.title}</li>
      <li>content:{message.content}</li>
    </ul>
  );
}
