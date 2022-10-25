import { useState, useEffect } from 'react';
import './Business.css'
import { Dropdown } from 'flowbite-react';
import SideBarBusiness from '../components/SideBarBusiness';

export default function BusinessSetting() {
    return (
        <div>
            <div className='display-flex'>
                <SideBarBusiness BusinessSetting="true" />
            </div>
            <div className='business-container'>

            </div>
        </div>
    )
}