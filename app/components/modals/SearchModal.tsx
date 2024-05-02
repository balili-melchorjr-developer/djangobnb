'use client'
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry"
import { Range } from "react-date-range"
import DatePicker from "../forms/Calendar"
import { useState } from "react"
import CustomButton from "../forms/CustomButton"


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content= (<></>)
    const searchModal = useSearchModal()
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [country, setCountry] = useState<SelectCountryValue>()
    const [numGuests, setNumGuests] = useState<string>('1')
    const [numBedrooms, setNumBedroods] = useState<string>('0')
    const [numBathrooms, setNumBathrooms] = useState<string>('0')


const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
        country: country?.label,
        checkIn: dateRange.startDate,
        checkOut: dateRange.endDate,
        guests: parseInt(numGuests),
        bedrooms: parseInt(numBedrooms),
        bathrooms: parseInt(numBathrooms),
        category: ''
    }

    searchModal.setQuery(newSearchQuery)
    searchModal.close()
}


    const _setDateRange = (selection: Range) => {
        if(searchModal.step === 'checkin') {
            searchModal.open('checkout')
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details')
        }

        setDateRange(selection)
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check in date ->"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckIn = (
        <>
             <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

             <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection as Range)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Check out date ->"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckOut = (
        <>
             <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

             <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection as Range)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check in date"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details?</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input 
                        type="number" 
                        min="1" 
                        placeholder="Number of Guests"
                        value={numGuests} 
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
                <div className="space-y-4">
                    <label>Number of bedrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        placeholder="Number of bedrooms"
                        value={numBedrooms} 
                        onChange={(e) => setNumBedroods(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input 
                        type="number" 
                        min="1" 
                        placeholder="Number of bathrooms"
                        value={numBathrooms} 
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Check out date"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )


    if (searchModal.step === 'location') {
        content = contentLocation
    } else if (searchModal.step == 'checkin') {
        content = contentCheckIn
    } else if (searchModal.step == 'checkout') {
        content = contentCheckOut
    } else if (searchModal.step == 'details') {
        content = contentDetails
    }
 
    return (
        <Modal
            label="Search"
            content={content}            
            close={searchModal.close}
            isOpen={searchModal.isOpen}
            
        />
    )
}

export default SearchModal