import React from "react";

class Search extends React.Component {
    render() {
        return (
            <section className="section mt-6" >
                <div className="container mt-5">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                name="url"
                                className="input"
                                type="text"
                                placeholder="Image URL"
                                autoFocus=""                                
                            />
                        </div>

                        <div className="control">
                            <button
                                type="submit"
                                className="input button is-primary"
                            >Search</button>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

export default Search;