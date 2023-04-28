import React from 'react'

import "./ChatMessage.css";

function ChatMessage(props) {

    function parseDate(date) {
        // get date
        const year = date.slice(0,4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);

        // get time
        const time = date.slice(11, 19);
        const [hour, minute, second] = time.split(':');

        // don't use military time
        var am = true;
        var hourInt = Number(hour);
        if (hourInt > 12) {
            hourInt -= 12;
            am = false;
        }
        else if (hourInt === 12) {
            am = false;
        }
        const amOrPm = am ? "AM" : "PM";

        return month + "/" + day + "/" + year + " " + String(hourInt) + ":" + minute + ":" + second + " " + amOrPm;   
    }

  return (
    <div className='message-container'>
        <h3 className='message-username'>{props.username}</h3>
        <p className='message-chat'>{props.chat}</p>
        <p className='message-time'>{parseDate(props.time)}</p>
    </div>
  )
}

export default ChatMessage