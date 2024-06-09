// app/profile/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '../../utils/api';
import { UserProfile } from '../../types/auth';

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await fetchWithToken<any>('/manage/info',
                    {
                        method: 'GET',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        }
                    });
                console.log(data)
                // setProfile(data);
            } catch (error) {
                console.error('Failed to load profile:', error);
                router.push('/pages/login');
            }
        }

        loadProfile();
    }, [router]);

    if (!profile) return <div>Loading...</div>;

    return <div>Welcome, {profile.name}</div>;
};

export default Profile;
