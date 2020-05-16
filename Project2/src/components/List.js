import React from 'react'

export default function Lists(props) {
    return (
        <ul>
            {props.lists.map(list => (
                <li key={list.id}>
                    <span
                        onClick={() => props.toggle && props.toggle(list.id)}
                        style={{ textDecoration: list.complete ? 'line-through' : 'none' }}
                    >
                        {list.name}
                    </span>
                    <button onClick={() => props.remove(list)}>
                        x
                    </button>
                </li>
            ))}
        </ul>
    )
}