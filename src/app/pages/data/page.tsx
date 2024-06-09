// app/data/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { fetchWithToken } from '../../utils/api';
import { PaginatedData } from '../../types/auth';

interface Item {
    id: string;
    name: string;
}

const DataPage = () => {
    const [data, setData] = useState<PaginatedData<Item> | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchWithToken<PaginatedData<Item>>(`/api/data?page=${page}`);
                setData(data);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        }

        loadData();
    }, [page]);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Data</h1>
            <ul>
                {data.items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === data.totalPages}>
                Next
            </button>
        </div>
    );
};

export default DataPage;
