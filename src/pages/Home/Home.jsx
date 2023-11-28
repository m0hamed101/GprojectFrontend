import React from 'react'
import Header from '../../components/Header/Header';
import { Courses } from '../../components/CoursesContaner/Courses';
import Event from '../../components/Event/Event';

export default function Home() {
    const user="user"
    return (
        <div className="App">
        <Header/>
            <div style={{ margin: '0px 3rem' }}>
                <div className='Appcontaner'>
                    <Courses/>
                    {user === "user"&&
                    <Event />
            }
                </div>
            </div>
        </div>
    )
}
