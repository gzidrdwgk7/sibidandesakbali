import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const KalenderAntrianPasien = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const renderTileContent = ({ date, view }) => {
    const notes = {
      '2025-04-05': 'Yogi',
      '2025-04-06': 'Adi',
    };

    const dateStr = date.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    return notes[dateStr] ? <p>{notes[dateStr]}</p> : null;
  };

  // Menambahkan className dengan kelas Bootstrap untuk tanggal tertentu
  const tileClassName = ({ date, view }) => {
    const notes = {
      '2025-04-05': 'bg-danger text-white rounded-3', // Jadwal pasien A
      '2025-04-06': 'bg-danger text-white rounded-3', // Jadwal pasien B
    };

    const dateStr = date.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    return notes[dateStr] ? notes[dateStr] : ''; // Menggunakan kelas Bootstrap untuk latar belakang dan sudut membulat
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      tileContent={renderTileContent}
      tileClassName={tileClassName} // Menggunakan tileClassName untuk mengubah latar belakang tanggal
      className="w-100 h-auto"
    />
  );
};

export default KalenderAntrianPasien;
