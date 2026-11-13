
"use client";

import { useEffect, useState } from "react";

const DATE_OF_BIRTH = new Date("2007-03-29T09:20:00+05:30");

function calculateAge(birthDate: Date) {
    const now = new Date();

    let years = now.getUTCFullYear() - birthDate.getUTCFullYear();

    // Find the most recent birthday anniversary.
    const anniversary = new Date(
        Date.UTC(
            birthDate.getUTCFullYear() + years,
            birthDate.getUTCMonth(),
            birthDate.getUTCDate(),
            birthDate.getUTCHours(),
            birthDate.getUTCMinutes(),
            birthDate.getUTCSeconds()
        )
    );

    if (anniversary.getTime() > now.getTime()) {
        years--;
    }

    // Calculate the most recent anniversary.
    const lastBirthday = new Date(
        Date.UTC(
            birthDate.getUTCFullYear() + years,
            birthDate.getUTCMonth(),
            birthDate.getUTCDate(),
            birthDate.getUTCHours(),
            birthDate.getUTCMinutes(),
            birthDate.getUTCSeconds()
        )
    );

    let remaining = now.getTime() - lastBirthday.getTime();

    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;

    const minutes = Math.floor(remaining / 60000);
    remaining %= 60000;

    const seconds = Math.floor(remaining / 1000);

    return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function AgeCounter() {
    const [age, setAge] = useState("");

    useEffect(() => {
        const updateAge = () => setAge(calculateAge(DATE_OF_BIRTH));

        updateAge();

        const interval = setInterval(updateAge, 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{age}</>;
}
