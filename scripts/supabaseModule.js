import { createClient } from
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qhosqycogofmmkchauel.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob3NxeWNvZ29mbW1rY2hhdWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTk2NjcsImV4cCI6MjA2MjQ5NTY2N30.wa9iQbeFumEJVyT8Bi4Ns4-2ABeYE6g2iG1a70iTAbM');

export async function fetchPeopleData(dname, license)
{
    if(dname.value != "")
    {
        const {data, error} = await supabase.from('People').select().ilike('Name','%'+dname.value+'%');
        return data;
    }
    else
    {
        const {data, error} = await supabase.from('People').select().ilike('LicenseNumber','%'+license.value+'%');
        return data;
    }
}

export async function fetchVehicleData(rego)
{
    const {data, error} = await supabase.from('Vehicles').select().ilike('VehicleID', '%'+rego.value+'%');
    return data;
}

export async function fetchAllPeople()
{
    const {data, error} = await supabase.from('People').select();
    return data;
}

export async function insertPerson(id, dname, address, dob, license, expire)
{
    const {data, error} = await supabase.from('People')
    .insert({ PersonID: id, Name: dname.value, Address: address.value, DOB: dob.value, LicenseNumber: license.value, ExpiryDate: expire.value});
}

export async function insertVehicle(id, make, model, colour, ownerid)
{
    const {data, error} = await supabase.from('Vehicles')
    .insert({ VehicleID: id.value.toUpperCase(), Make: make.value, Model: model.value, Colour: colour.value, OwnerID: ownerid});
}

export async function fetchRego(rego) {
    const {data, error} = await supabase.from('Vehicles').select('VehicleID').ilike('VehicleID', rego.value);
    return data;
}