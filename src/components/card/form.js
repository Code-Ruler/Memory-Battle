import React, { useState } from "react";
import './form.css'

const FormDetails = ({setType, setNoOfBox}) => {


    return (
        <form>
            <label >
                <input className="details"
                    type="text"
                    placeholder="Type of Images..."
                    onChange={(e) => setType(e.target.value)}
                />
            </label>

            <label >
                <input className="details"
                    type="text"
                    placeholder="Enter no of Boxes..."
                    onChange={(e) => setNoOfBox(e.target.value)}
                />
            </label>
        </form>
    );
}

export default FormDetails;