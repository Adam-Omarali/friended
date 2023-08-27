import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import profile from '../img/profile.png';
import link from "../img/Link.png";
import "./correlation.css";

export const dynamic = 'force-dynamic';

const dataArray = [
  {
    firstName: "John",
    lastName: "Doe",
    percentage: 75
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    percentage: 90
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    percentage: 60
  },
];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <body className="w-full flex-center min-h-screen">
        <div className="profile-image">
          <Image src={profile} alt="Profile Picture" width={75} height={75} />
        </div>
        <div className="flex-center">
          <h1 className="product-name">friended.</h1>
          <Link href="/" className="profile-link">
            profile.
          </Link>
          <Link href="/spaces" className="connect-link">
            connect.
          </Link>
          <div className="searchContainer">
            <input
              type="text"
              className="searchInput"
              placeholder="search for a name, skill, or interest."
            />
            <button className="searchButton">Search</button>
          </div>
          <h2 className="description">currently showing those most similar to you.</h2>
          <div className="match-container">
            {dataArray.map((match, index) => (
                <div key={index} className="match">
                    <div className="match-picture">
                        <Image src={profile} alt="Match Profile Picture" width={200} height={200} />
                    </div>
                    <Link href="/">
                        <Image src={link} alt="Match Link Icon" className="match-link-icon"/>
                    </Link>
                    <div className="match-info">
                        <p className="match-name">{match.firstName}<br/>{match.lastName}</p>
                        <p className="match-percentage">{match.percentage}%</p>
                    </div>
                </div>
            ))}

          </div>
        </div>
      </body>
    </div>
  );
}