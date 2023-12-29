import React from 'react';
import { FaBook, FaBookReader, FaUsers, FaUserPlus } from 'react-icons/fa';
import { Card } from './Card';

export function CardList() {
    const cardData = [
        {
            title: "BORROWED",
            count: 150,
            colors: "success",
            icon: <FaBook />
        },
        {
            title: "RETURNED",
            count: 30,
            colors: "warning",
            icon: <FaBookReader />
        },
        {
            title: "VISITORS",
            count: 350,
            colors: "info",
            icon: <FaUsers />
        },
        {
            title: "NEW MEMBER",
            count: "58",
            colors: "primary",
            icon: <FaUserPlus />
        }
    ];

    return (
        <div className='row'>
            {cardData.map((dt, index) => <Card key={index} data={dt} />)}
        </div>
    );
}
