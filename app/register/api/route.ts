import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import axios from "axios";

export async function POST(request: Request) {
  const supabase = createServerComponentClient({ cookies });

  function concatUserJSON(user: any) {
    let concatString = "";

    // Concatenate User Name
    if (user.data.first_name) {
      concatString += user.data.first_name;
    }

    if (user.data.last_name) {
      concatString += " " + user.data.last_name;
    }

    // Concatenate Skills Array
    if (user.data.skills && user.data.skills.length > 0) {
      concatString += " skills: " + user.data.skills.join(", ") + ".\n";
    }

    if (user.data.certifications && user.data.certifications.length > 0) {
      for (const certification of user.data.certifications) {
        if (certification.name && certification.authority) {
          concatString += `${certification.name}, given by: ${certification.authority}\n`;
        }
      }
    }

    if (user.data.industry) {
      concatString += ". They work in " + user.data.industry;
    }

    // Concatenate Summary
    if (user.data.summary) {
      concatString += ". " + user.data.summary + ".\n";
    }

    // Concatenate Subtitle
    if (user.data.sub_title) {
      concatString += user.data.sub_title + "\n";
    }

    // Concatenate education experiences into the concatString variable
    if (user.data.education && Array.isArray(user.data.education)) {
      user.data.education.forEach((edu: any) => {
        if (edu.degree_name && edu.school && edu.school.name) {
          concatString += `${edu.degree_name} in ${
            edu.field_of_study || "Unknown Field"
          } from ${edu.school.name}\n`;
        }
      });
    }

    for (const group of user.data.position_groups) {
      for (const position of group.profile_positions) {
        const title = position.title || "";
        const company = position.company || "";
        const description = position.description || "";

        concatString += `${title} at ${company} (${description})`;
      }
    }

    // Print the concatenated string

    return concatString;
  }

  function concExperiences(user: any) {
    let concatString = "";
    for (const group of user.data.position_groups) {
      for (const position of group.profile_positions) {
        const title = position.title || "";
        const company = position.company || "";
        const description = position.description || "";

        concatString += `${title} at ${company} (${description})`;
      }
    }
    return concatString;
  }

  function concSkills(user: any) {
    let concatString = "";
    // Concatenate Skills Array
    if (user.data.skills && user.data.skills.length > 0) {
      concatString += " skills: " + user.data.skills.join(", ") + ".\n";
    }
    return concatString;
  }

  let { username, organization, linkedin, devpost, id } = await request.json();
  console.log(linkedin, devpost);

  //   Get Linkedin Data and format it:

  //   Get profile id from Linkedin url
  const regexPattern = /\/in\/([^/]+)/;
  const match = regexPattern.exec(linkedin);
  const profileId = match ? match[1] : null;

  const options = {
    method: "POST",
    url: "https://linkedin-profiles-and-company-data.p.rapidapi.com/profile-details",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "linkedin-profiles-and-company-data.p.rapidapi.com",
    },
    data: {
      profile_id: profileId,
      profile_type: "personal",
      contact_info: false,
      recommendations: false,
      related_profiles: false,
    },
  };

  const response = await axios.request(options);

  //   Devpost api request here
  const usernamePattern = /devpost\.com\/(\w+)/i;
  const devpostmatch = devpost.match(usernamePattern);

  const devpostoptions = {
    method: "GET",
    url: "https://ripeabledesigners.jshan.repl.co/user/" + devpostmatch[1],
  };

  const devpostresponse = await axios.request(devpostoptions);
  const devpostdata = devpostresponse.data;
  const interestsString = devpostdata.interests.join(", ");

  const experiencesString = concExperiences(response);
  const skillsString = concSkills(response);

  console.log(interestsString, experiencesString, skillsString);

  const concatenatedJSON = concatUserJSON(response);

  const embeddings = new OpenAIEmbeddings();

  const returnedEmbedddings = await embeddings.embedQuery(concatenatedJSON);
  console.log(returnedEmbedddings);

  let { data, error } = await supabase.from("users").upsert([
    {
      id,
      username,
      friends: [],
      events: [],
      organization: organization,
      linkedin,
      devpost,
      embedding: returnedEmbedddings,
      scraped_data: concatenatedJSON,
      interests: interestsString,
      skills: skillsString,
      experiences: experiencesString,
    },
  ]);

  if (error) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json(data);
}
