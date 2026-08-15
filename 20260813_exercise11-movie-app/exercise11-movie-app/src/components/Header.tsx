import { useState } from 'react';
const Header = () => {

    const [formListFilter1, setFormListFilter1] = useState({
        FilterId: 0,
    });

    const filter1 = {
        1: "A-Z",
        2: "Z-A"
    };

    const [formListFilter2, setFormListFilter2] = useState({
        FilterId: 0,
    });

    const filter2 = {
        1: "Comedy",
        2: "Satire",
        3: "Contemporary",
        4: "Historical",
        5: "Fantasy",
        6: "Sci-fi",
        7: "Action",
        8: "Adventure",
        9: "Thriller",
        10: "Horror",
        11: "Romance",
        12: "Drama",
        13: "Crime",
    };

    const [formListFilter3, setFormListFilter3] = useState({
        FilterId: 0,
    });

    const filter3 = {
        1: "< 60 min",
        2: "60-90 min",
        3: "90-120 min",
        4: "> 120 min",
    };

    const [formListFilter4, setFormListFilter4] = useState({
        FilterId: 0,
    });

    const filter4 = {
        1: "Contemporary",
        2: "Historical",
        3: "Fantasy",
        4: "Sci-fi",
    };

    // const [formListFilter5, setFormListFilter5] = useState({
    //     FilterId: 0,
    // });

    // const filter5 = {
    //     1: "Contemporary",
    //     2: "Historical",
    //     3: "Fantasy",
    //     4: "Sci-fi",
    // };
    return (
        <header style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <h1>At the Movies</h1>
            </div>
            <div>
                <select
                    value={formListFilter1.FilterId}
                    onChange={(e) => {
                        setFormListFilter1({ ...formListFilter1, FilterId: Number(e.target.value) });
                        console.log("Selected FilterId:", formListFilter1);
                    }}
                    required
                >
                    <option value="">Select Sorting</option>
                    {Object.entries(filter1).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    value={formListFilter2.FilterId}
                    onChange={(e) => {
                        setFormListFilter2({ ...formListFilter2, FilterId: Number(e.target.value) });
                        console.log("Selected FilterId:", e.target.value);
                    }}
                    required
                >
                    <option value="">Select Genre</option>
                    {Object.entries(filter2).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    value={formListFilter3.FilterId}
                    onChange={(e) => {
                        setFormListFilter3({ ...formListFilter3, FilterId: Number(e.target.value) });
                        console.log("Selected FilterId:", e.target.value);
                    }}
                    required
                >
                    <option value="">Select Length</option>
                    {Object.entries(filter3).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    value={formListFilter4.FilterId}
                    onChange={(e) => {
                        setFormListFilter4({ ...formListFilter4, FilterId: Number(e.target.value) });
                        console.log("Selected FilterId:", e.target.value);
                    }}
                    required
                >
                    <option value="">Select Setting</option>
                    {Object.entries(filter4).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                {/* <select
                    value={formListFilter5.FilterId}
                    onChange={(e) => {
                        setFormListFilter5({ ...formListFilter5, FilterId: Number(e.target.value) });
                        console.log("Selected FilterId:", e.target.value);
                    }}
                    required
                >
                    <option value="">Select Setting</option>
                    {Object.entries(filter5).map(([id, name]) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select> */}
            </div>
        </header>
    )
}

export default Header;