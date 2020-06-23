import React, { useState } from 'react';

export default function CalorieTracker() {
    const [date, setDate] = useState(new Date())
    return (
        <div>{date}</div>
    )
}
