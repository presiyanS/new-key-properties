/**
 * Populates the titleEn / descriptionEn (and featuresEn where present) fields
 * on all `listing` documents in the production dataset, so the /en site
 * shows real English property copy instead of falling back to Bulgarian.
 *
 * Usage: SANITY_API_WRITE_TOKEN=<token> node scripts/translate-listings-en.mjs
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN
if (!token) { console.error('❌  Missing SANITY_API_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: '9gz26s06',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Shared boilerplate blocks reused verbatim (in Bulgarian) across many
// listings from the same development/building. Defined once here to keep
// the translations consistent and the file manageable.
// ---------------------------------------------------------------------------

const HANDOVER_BLOCK = `The apartment is handed over as follows:
Floors — cement screed in the bedrooms, living room, bathrooms, sanitary areas, hallway, entryway, and storage room. Leveled to achieve a smooth, even surface, without a finish coating.
Ceilings — gypsum skim coat with corner guards installed on all external corners (option for a suspended gypsum-board ceiling).
Doors — armored front door; interior doors not installed.
Plumbing — pipe stub-outs for the kitchen sink, dishwasher, washing machine, and dryer in the kitchen and storage room.
HVAC — mono-split system, with an indoor and outdoor unit planned for each room. PEX pipes run from the manifold panel to supply the radiators in every room.
Gas installation — per the gas-supply design, copper piping (hard copper) runs from the common areas on each floor landing to the gas boiler located on the terraces. PPR piping runs from the boiler to the manifold box.
Electrical installation — complete, fitted out to Bulgarian standards, with switches and outlets, an apartment distribution board with circuit breakers and residual-current protection, and wiring for light fixtures.
Cable TV and Internet wiring.
Wiring and power supply for a video intercom system with electric door-lock release; access-control system for the building entrance doors.`

// Ovcha Kupel 2, "Sgrada B/A/V" series — ORONA elevators, district (TEC) heating
const BUILDING_BLOCK_1 = `The Building
Brick masonry: exterior walls — 25 cm ceramic brick, Wienerberger Porotherm; interior walls — 12 cm ceramic brick.
Facade: Baumit or Ceresit system — 12 cm EPS insulation.
Windows: PVC with a six-chamber profile and triple glazing, German manufacturer.
Apartments: floor — cement screed, walls and ceilings — gypsum plaster; armored front door with a threshold and MDF veneer installed; terrace flooring — porcelain stoneware.
Handover condition: plastered and screeded, without interior doors.
Garages: garage door with automatic opening and closing; floor — polished concrete, walls and ceiling — lime-cement plaster.
Heating and cooling: district heating — distribution and building installation to radiators; aluminum radiators installed; outdoor/indoor unit connections in place for air conditioning/heat pumps.
Elevators: 1 per entrance, 8-person capacity, electric — "ORONA".
Common areas: staircase, floor and half-floor landings, lobby and corridors — gypsum skim coat and latex paint on walls/ceilings, granite and/or porcelain stoneware flooring, metal railing, per the interior design project.`

// Manastirski Livadi West — ETEM windows, KONE elevators, gas underfloor heating
const BUILDING_BLOCK_2 = `Brick masonry: exterior walls — Wienerberger Porotherm ceramic brick, 25 cm; interior walls — Wienerberger Porotherm ceramic brick, 12 cm. Facade system: BAUMIT with 12 cm insulation / ventilated facade with aluminum profiles. Apartments: floor — cement screed, walls and ceilings — gypsum plaster; armored front door with a threshold and MDF veneer installed. Windows: "ETEM" aluminum profile, E75 system with thermal break and triple glazing — excellent energy efficiency, durability, and sound insulation. Heating: gas-fired underfloor heating, with distribution in place for a gas boiler and air-conditioning units. Elevators: 2 units, 8-person capacity — "KONE", electric with automatic doors, luxury interior. Common areas: contemporary, upscale look with decorative lighting, stone flooring, wall cladding per the interior design project.

Construction stage: Act 14.
Expected timeline: Act 15 — March 2027; Act 16 — September 2027.

Available for sale in the building:
• Two-room apartments (from 60.63 sq.m) — from €230,500; 15 available.
• Three-room apartments (from 104.49 sq.m) — from €373,000; 13 available.
• Multi-room apartments (from 143.08 sq.m) — from €496,000; 6 available.
• Parking spaces and garages (12.50 sq.m) — from €23,500; 51 available.`

// Dragalevtsi boutique building
const DRAGALEVTSI_BUILDING_BLOCK = `A boutique residential building with only 28 apartments. Parking secured for 2 cars per home. Panoramic views of Vitosha Mountain and nighttime Sofia. Functional layout with spacious rooms. Low common-area ratio.

Exterior walls: 25 cm ceramic brick, Wienerberger Porotherm
Interior partition walls: 12 cm ceramic brick
Windows: high-end aluminum profile with triple glazing
Facade: ventilated facade of large-format ceramic tiles and aluminum composite panels
Common areas: luxurious, contemporary look, stone flooring and wall cladding per the interior design project
Heating and cooling: building-wide gas installation; underfloor heating distribution installed with a connection point for a gas boiler; outdoor/indoor unit connections in place for air conditioning/heat pumps
Yard: richly landscaped with mature planting and an automatic irrigation system`

const DRAGALEVTSI_FOOTER = `For viewings and further information, please contact us at the number listed.
Choose quality, style, and security — choose New Key Properties.

TRUST – HONESTY – RESULTS
Works with co-broking agents: Yes`

// ---------------------------------------------------------------------------
// Listings — English translations of title / description (features are all
// empty in production, so featuresEn is omitted throughout).
// ---------------------------------------------------------------------------

const listings = [
  {
    _id: '0HgmXq5r0B26UJ0hsewMak',
    titleEn: 'Three-Room Apartment, Druzhba 2 — Apt. 19',
    descriptionEn: `EXCLUSIVE OFFER FROM NEW KEY PROPERTIES.

We present a spacious three-room apartment with SW/NE exposure in a new, luxury building by a leading developer — a blend of refined design, quality, and comfort.

THE BUILDING

The building stands out with high-end construction and impressive architecture.

Monolithic reinforced-concrete structure, beam-free frame system

Seismic shear walls positioned to suit the architectural layout

Exterior walls: 25 cm ceramic brick

Interior partition walls: 12 cm

Windows: high-quality PVC with triple glazing

Facade: a combination of elegant Laminam cladding, stone-wool insulation, and water-repellent render

Common areas: natural stone and porcelain stoneware flooring

Heating: central district heating

Location: less than 100 m from Druzhba metro station

THE APARTMENT

Located on the 4th floor of 9, the property impresses with abundant light, spaciousness, and a functional layout.

Total area: 119.39 sq.m.

Net area: 104.53 sq.m.

Exposure: SW/NE, providing light in the apartment throughout the day.

The property is ideal both as your future home and as a profitable investment.

ADDITIONAL OPTION

Option to purchase an underground garage — extra comfort and security for your car.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewMuI',
    titleEn: 'Three-Room Apartment, Malinova Dolina — Apt. 7 (92.09 sq.m)',
    descriptionEn: `Apartment 7, located in Building B, Entrance B, is set on the second residential floor (third floor of the building) and offers a well-balanced layout with a total area of 92.09 sq.m, of which 79.90 sq.m is net living space. The south/north exposure provides natural light for most of the day, with the living area and one bedroom enjoying a sunny southern exposure, while the second bedroom faces the quieter north side, ideal for rest and relaxation.
The home features a convenient entryway, a bathroom with toilet, a separate WC, a living room with an open kitchen area, two bedrooms, and a balcony — a space designed for both an active daily routine and calm family moments.
There is an option to purchase a parking space, adding further convenience and comfort to the property.


Price: EUR 211,807.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewN7K',
    titleEn: 'Two-Room Apartment, Malinova Dolina — Apt. 15 (73.50 sq.m)',
    descriptionEn: `Apartment 15, located in Building B, Entrance B, is set on the fifth residential floor (sixth and top floor of the building) and offers a sense of light, space, and calm. With a total area of 73.50 sq.m and a net living area of 64.06 sq.m, the home combines a compact footprint with an excellent functional layout.
The southwest exposure provides natural light for almost the entire day, with the living area enjoying sun from the south and west, and the bedroom benefiting from a warm southern exposure. The high floor contributes to better lighting, more air, and a sense of open space — ideal for those who value light and a peaceful atmosphere.
The apartment features a convenient entryway, a bathroom with toilet, a separate laundry room, a bright living room with an open kitchen area, a comfortable bedroom, and a terrace — perfect for morning coffee or evening relaxation.
There is an option to purchase a parking space, adding further comfort and convenience to the property.


Price: EUR 176,400.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewO0i',
    titleEn: 'Three-Room Apartment, Dragalevtsi — Apt. 10',
    descriptionEn: `OFFER FROM NEW KEY PROPERTIES

We present a functional and spacious three-room apartment with its own yard (253.36 sq.m) in a new boutique building in the Dragalevtsi district — a blend of refined design, quality, and comfort.

THE BUILDING

${DRAGALEVTSI_BUILDING_BLOCK}

THE APARTMENT

Located on the 1st floor of 4, the property impresses with spaciousness and a functional layout.

Total area: 143.86 sq.m.

Net area: 127.34 sq.m.

The apartment comes with its own private yard of 253.36 sq.m, available at an additional price of EUR 45,000.

The property is ideal both as your future home and as a profitable investment.

ADDITIONAL OPTION

Option to purchase an underground garage or parking space.

${DRAGALEVTSI_FOOTER}
Price: EUR 342,000`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewOaY',
    titleEn: 'Two-Room Apartment, Manastirski Livadi West — Apt. 40 (69.52 sq.m)',
    descriptionEn: `Hallway, functional living room with kitchen area, bedroom, bathroom with toilet, terrace. Brick construction (25 cm ceramic brick), triple-glazed aluminum joinery, underfloor gas heating, modern amenities. Act 14; Act 15: March 2027, Act 16: September 2027.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewPdi',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. B10 (123.34 sq.m)',
    descriptionEn: `Apartment B10
The apartment has three rooms and is located on the third floor (second above ground level). The built-up area is 103.52 sq.m, and the total area is 123.34 sq.m. It comprises an L-shaped hallway, a spacious living room (30.7 sq.m) with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a large terrace. The exposure is south.
The apartment comes with a storage room of 3.25 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewQ3m',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. B27 (123.34 sq.m)',
    descriptionEn: `Apartment B27
The apartment has three rooms and is located on the sixth floor (fifth above ground level). The built-up area is 103.52 sq.m, and the total area is 123.34 sq.m. It comprises an L-shaped hallway, a spacious living room (30.7 sq.m) with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a large terrace. The exposure is west and south.
The apartment comes with a storage room of 3.25 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewQGo',
    titleEn: 'Two-Room Apartment, Ovcha Kupel 2 — Apt. B43 (70.89 sq.m)',
    descriptionEn: `Apartment B43
The apartment has two rooms and is located on the ninth floor (top floor). The built-up area is 59.80 sq.m, and the total area is 70.89 sq.m. It comprises an entryway, a living room with an open kitchen area, a bedroom, a bathroom with toilet, and a terrace. The exposure is north.
The apartment comes with a storage room of 2.02 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewRGi',
    titleEn: 'Two-Room Apartment for Rent, Borovo',
    descriptionEn: `A bright, warm, and stylishly furnished apartment on the 5th floor of a well-maintained building with an elevator. South-facing — natural light throughout the day. Spacious living/dining room, a fully equipped kitchen, a comfortable bedroom, a stylish bathroom with toilet, and a functional entryway. Energy-efficient. Close to public transport, shops, and green spaces.`,
  },
  {
    _id: '0HgmXq5r0B26UJ0hsewRgm',
    titleEn: 'Office Space for Rent, near Universiada Hall',
    descriptionEn: `Offices for rent in a business building located next to the Universiada Hall.
Available for lease: an entire floor (300 sq.m) or individual offices ranging from 50 sq.m to 70 sq.m, priced at €8/sq.m excluding VAT, with common-area maintenance included (daily cleaning, 24-hour on-site security plus video surveillance). All spaces have been renovated. Heating is via the district heating network.
Option to rent a parking space.
The building has its own restaurant, and the surrounding area offers several more restaurants and fast-food outlets.
A well-connected location just minutes from central Sofia.`,
  },
  {
    _id: '11045251-19cd-4178-b504-4e7a3af76167',
    titleEn: 'Two-Room Apartment, Malinova Dolina — Apt. 6',
    descriptionEn: `The apartment has two rooms and is located on the ground floor. The net area of the apartment is 78.33 sq.m, and the total area is 87.64 sq.m plus a 217 sq.m yard. It comprises an entryway, a large (40.34 sq.m) living room with an open kitchen area, a spacious bedroom, a bathroom with toilet, and a large private yard. The exposure is south and west.
The apartment is spacious and bright. Suitable for pet owners or as an investment.
Price – EUR 241,145

${HANDOVER_BLOCK}`,
  },
  {
    _id: '2mY9uloSfyIoI02t77GvIS',
    titleEn: 'Garage, Druzhba 2',
    descriptionEn: `A large underground garage (No. 8, 33.23 sq.m) in a newly built building. Allows for the installation of an EV charging station. Suitable for personal use or as an investment.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77GvYQ',
    titleEn: 'Three-Room Apartment, Druzhba 2 — Apt. 33',
    descriptionEn: `EXCLUSIVE OFFER FROM NEW KEY PROPERTIES

We present a spacious three-room apartment with SW/NE exposure in a new, luxury building by a leading developer — a blend of refined design, quality, and comfort.

THE BUILDING
The building stands out with high-end construction and impressive architecture.
Monolithic reinforced-concrete structure, beam-free frame system
Seismic shear walls positioned to suit the architectural layout
Exterior walls: 25 cm ceramic brick

Interior partition walls: 12 cm

Windows: high-quality PVC with triple glazing

Facade: a combination of elegant Laminam cladding, stone-wool insulation, and water-repellent render

Common areas: natural stone and porcelain stoneware flooring

Heating: central district heating

Less than 100 m from Druzhba metro station.

THE APARTMENT

Located on the 4th floor of 9, the property impresses with abundant light, spaciousness, and a functional layout

Total area: 133.86 sq.m.

Net area: 116.96 sq.m.

Exposure: SW/NE, providing light in the apartment throughout the day.

The property is ideal both as your future home and as a profitable investment.

ADDITIONAL OPTION

Option to purchase an underground garage — extra comfort and security for your car.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77GvuC',
    titleEn: 'Three-Room Apartment, Malinova Dolina — Apt. 28 (116.56 sq.m)',
    descriptionEn: `South/southeast exposure for optimal natural light. Layout: entryway, bathroom with toilet, separate WC, utility room, a 27 sq.m living room with kitchen area, two bedrooms, and a loggia. Complex amenities: underground parking, green spaces, sports areas, playgrounds, outdoor fitness equipment, and modern architecture featuring stone, HPL panels, and high-quality render. Act 14.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77Gw2u',
    titleEn: 'Three-Room Apartment, Dragalevtsi — Apt. 4',
    descriptionEn: `We present a functional and spacious three-room apartment with its own yard (104.49 sq.m) in a new boutique building in the Dragalevtsi district — a blend of refined design, quality, and comfort.

THE BUILDING

${DRAGALEVTSI_BUILDING_BLOCK}

THE APARTMENT

Located on the 1st floor (ground level) of 4, the apartment impresses with spaciousness and a functional layout.

Total area: 115.00 sq.m.

Net area: 101.80 sq.m.

The apartment comes with its own private yard of 104.49 sq.m, available at an additional price of EUR 30,000.

The property is ideal both as your future home and as a profitable investment.

Option to purchase an underground garage or parking space.

${DRAGALEVTSI_FOOTER}

Construction stage: Act 14

Price: EUR 260,000`,
  },
  {
    _id: '2mY9uloSfyIoI02t77GwFy',
    titleEn: 'Four-Room Apartment, Ohridsko Ezero 3 — Apt. 73 (216.56 sq.m)',
    descriptionEn: `A 58 sq.m living room with kitchen area, three bedrooms (one with a walk-in closet), two bathrooms, a separate laundry room, and two terraces totaling 48.54 sq.m. Complex amenities: playground, underground parking, 24-hour security, energy-efficient heating/cooling, and professional property management. Finishes: plaster, cement screed, underfloor heating, a Toshiba heat pump, electrical installation, plumbing, and an armored door.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77Gwbk',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. A10 (108.12 sq.m)',
    descriptionEn: `Apartment A10
The apartment has three rooms and is located on the third floor (second above ground level). The built-up area is 92.46 sq.m, and the total area is 108.12 sq.m. It comprises an L-shaped hallway, a living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a terrace. The exposure is west and south, with the living room facing west and south, one bedroom facing south, and the other facing west.
The apartment comes with a storage room of 3.23 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: '2mY9uloSfyIoI02t77GxAa',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. V05 (110.74 sq.m)',
    descriptionEn: `Apartment V05
The apartment has three rooms and is located on the second floor (first above ground level). The built-up area is 94.70 sq.m, and the total area is 110.74 sq.m. It comprises an L-shaped hallway, a living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a large terrace. The exposure is south and east, with the living room facing south and east, one bedroom facing south, and the other facing east.
The apartment comes with a storage room of 4.34 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: '2mY9uloSfyIoI02t77Gxf4',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. V42 (113.03 sq.m)',
    descriptionEn: `Hallway, living room with kitchen, master bedroom with walk-in closet and en-suite bathroom, second bedroom, bathroom, large terrace. A 3.32 sq.m storage room is included. Ceramic brick construction, EPS insulation, triple-glazed PVC windows, aluminum radiators, ORONA elevators, granite flooring. Act 14; Act 15: September 2027; Act 16: February 2028.`,
  },
  {
    _id: '2mY9uloSfyIoI02t77Gxqg',
    titleEn: 'Two-Room Apartment, Sozopol — 70 sq.m',
    descriptionEn: `A two-room apartment in Sozopol — a seaside resort town rich in history and natural beauty. An excellent option as a holiday home or investment. Contact us for the current price and further information.`,
  },
  {
    _id: '899050c0-c0c6-4c99-ad86-ff672f15ffbf',
    titleEn: 'Two-Room Apartment, Malinova Dolina — Apt. 7',
    descriptionEn: `The apartment has two rooms and is located on the ground floor. The net area of the apartment is 64.37 sq.m, and the total area is 71.58 sq.m plus an 84.55 sq.m yard. It comprises an entryway, a functional living room with an open kitchen corner, a spacious bedroom, a bathroom with toilet, and a private yard. The exposure is west.
The apartment is spacious and suitable for personal use or as an investment.
Price – EUR 169,432

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'EPPCCgj0eJFdi7xxT1l3in',
    titleEn: 'Two-Room Apartment, Manastirski Livadi West — Apt. 40',
    descriptionEn: `Apartment 40 has two rooms and is located on the fifth floor (fourth above ground level). The living area is 61.83 sq.m, and the total area is 69.52 sq.m. It comprises a hallway, a functional living room with an open kitchen area, a bedroom, a bathroom with toilet, and a terrace. The exposure is east.

${BUILDING_BLOCK_2}`,
  },
  {
    _id: 'F6N2oHhuzX46uk6RE34UeW',
    titleEn: 'Two-Room Apartment, Manastirski Livadi West — Apt. 51',
    descriptionEn: `Apartment 51 has two rooms and is located on the seventh floor (sixth above ground level). The living area is 57.07 sq.m, and the total area is 64.16 sq.m. It comprises a hallway, a functional living room with an open kitchen area, a bedroom, a bathroom with toilet, and a terrace. The exposure is east.

${BUILDING_BLOCK_2}`,
  },
  {
    _id: 'GAQq4ZGeWhT4W8RVOIFJAN',
    titleEn: 'Three-Room Apartment — Hipodruma',
    descriptionEn: `New Key Properties is offering a luxurious and spacious three-room apartment for rent in the Hipodruma district.

The apartment is located in a large panel building (EPK) from the late 1970s with controlled access and well-maintained common areas. 2nd floor of 14. Within easy reach of a playground, several kindergartens, schools, public transport stops (Krasno Selo metro station is 500 m away), numerous shops and restaurants, and medical facilities.

Layout: a large L-shaped hallway, a living room, a separate dining area and kitchenette, a large bedroom, a second room, a bathroom with toilet, a separate WC, a utility room, and two large glazed terraces.

The apartment is stylishly furnished.

Rent: EUR 850.`,
  },
  {
    _id: 'a56cf8a4-5d3d-461d-9ade-d5c855857117',
    titleEn: 'Two-Room Apartment, Malinova Dolina — Apt. 4',
    descriptionEn: `The apartment has two rooms and is located on the ground floor. The net area of the apartment is 67.78 sq.m, and the total area is 74.91 sq.m plus a 47.55 sq.m yard. It comprises a wide entryway, a functional living room with an open kitchen corner, a spacious bedroom, a bathroom with toilet, a laundry room, and a private yard. The exposure is west.
The apartment is spacious and suitable for pet owners or as an investment.
Price – EUR 167,869

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'ada2cfe6-5d30-40da-9d67-9ba74b3ee2f7',
    titleEn: 'Three-Room Apartment, Malinova Dolina — Apt. 3',
    descriptionEn: `The apartment has three rooms and is located on the ground floor. The net area of the apartment is 110.77 sq.m, and the total area is 122.90 sq.m plus a 177.07 sq.m yard. It comprises an L-shaped hallway, a large (44 sq.m) living room with an open kitchen area, two spacious bedrooms, a bathroom with toilet, a separate WC, a laundry room, and a large private yard. The exposure is west and south, with the living room facing west and south, one bedroom facing west and the other facing south.
The apartment is very spacious and bright. Exceptionally well-suited for a family with children and pets.
Price – EUR 299,720

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'aeb634e0-ac25-40c1-b436-43fa906e19db',
    titleEn: 'Four-Room Apartment, Malinova Dolina — Apt. 32',
    descriptionEn: `The apartment has four rooms and is located on the third floor (fourth residential floor). The net area of the apartment is 152.15 sq.m, and the total area is 172.19 sq.m. It comprises an entryway, a hallway, a large living room with an open kitchen area, three large bedrooms — one with a walk-in closet and an en-suite bathroom with toilet — a bathroom with toilet, a laundry niche, and two terraces. The exposure is west and south. The living room faces west and south, two bedrooms face west, and one bedroom faces south.
The apartment is very spacious and bright. Exceptionally well-suited for families with children.
Price – EUR 414,973

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'jNrKGDgaXIG7AUzuDbbDHm',
    titleEn: 'Luxury Residential Building in Ovcha Kupel 2',
    descriptionEn: `A boutique luxury building located in the Ovcha Kupel 2 district, close to President Lincoln Blvd. It comprises two basement levels, a ground floor, and eight residential floors. Functional layouts with spacious, bright rooms. A shared landscaped yard for all residents with a seating/relaxation area.

Available for sale:
• Two-room apartments from 64.14 sq.m gross — from €151,000; 8 apartments available.
• Three-room apartments from 103.57 sq.m gross — from €217,000; 36 apartments available.
• Four-room apartments from 166.61 sq.m gross — from €550,000; 2 apartments available.

Construction and materials:
Facade: ventilated facade with large-format ceramic tiles and aluminum panels. Insulation: 12 cm stone wool. Brick masonry — exterior walls: Wienerberger Porotherm ceramic brick, 25 cm; interior walls: Wienerberger Porotherm ceramic brick, 12 cm. Aluminum windows with triple glazing.

Heating and cooling: GAS — distribution in place for radiators and boiler; connections for air conditioning/heat pumps.

Elevators: ORONA, 8-person capacity — 2 units.

Common areas: contemporary, upscale look, stone flooring, wall cladding per the interior design project.

Yard: richly landscaped with mature planting and an automatic irrigation system.

Construction stage: at the design/pre-construction stage.
Planned construction start: April 2026.
Planned completion (Act 16): June 2029 (overall timeline 36–42 months).
Bank financing has been secured for the project, guaranteeing on-time completion.`,
  },
  {
    _id: 'jNrKGDgaXIG7AUzuDbeCEQ',
    titleEn: 'SoHome Residential Park',
    descriptionEn: `SoHome Residential Park is a large-scale residential complex in the Lozenets district of Sofia, at 27 Srebarna Street — directly adjacent to the Hunting Park (Loven Park) and the Sofia Zoo.

The complex is designed to include:
• 841 apartments
• A restaurant with a garden
• A children's center with an activity room
• A fitness center with a wellness area
• 18 food and non-food retail units
• 9 playgrounds and recreation areas
• 1,188 underground garages and parking spaces

Park setting: 30 decares of parks, gardens, water features, fountains, and an outdoor children's fitness area.

Construction and materials:
Facade: ventilated, aluminum-framed, clad with ABC – Klinkergruppe clinker tiles, insulated with 10 cm laminated stone-mineral wool with a vapor-permeable, wind-resistant membrane. Windows: Schüco AWS 75 SI aluminum system with concealed hardware. Glazing: triple 46 mm Guardian Glass.

Heating and cooling: individual Toshiba air-to-water heat pump; water-based underfloor heating installed in every room. Elevators: quiet, electric Schindler units.

Security: controlled access, video surveillance, and a 24/7 mobile patrol. Management and maintenance by a company controlled by the developer.

Underground parking: fully underground across 2 levels — no vehicle traffic in the inner courtyard.

Available for sale: three- and four-room apartments.

Construction phases:
• Phase 1 — completed and commissioned July 2022 (Buildings 6, 7, 8, and 9)
• Phase 2 — completed and commissioned April 2024 (Buildings 1, 2, 3, 4, 5, and 10)
• Phase 3 — Buildings 11, 12, 13 (under construction)`,
  },
  {
    _id: 'jNrKGDgaXIG7AUzuDbirzV',
    titleEn: 'Three-Room Apartment, Manastirski Livadi West — Apt. 2',
    descriptionEn: `Apartment 2 has three rooms and is located on the first floor (above ground level). The living area is 94.20 sq.m, and the total area is 105.91 sq.m. It comprises an entryway, a spacious (30.5 sq.m) living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a terrace. The exposure is east and south — the living room faces east and south, one bedroom faces east, and the other faces south. The apartment is very spacious and bright.

${BUILDING_BLOCK_2}`,
  },
  {
    _id: 'jNrKGDgaXIG7AUzuDbp2Nx',
    titleEn: 'Ohridsko Ezero Park Complex',
    descriptionEn: `The "Ohridsko Ezero Park" complex is located at 3 Ohridsko Ezero Street — on a quiet, green street close to central Sofia, with quick access to parks, the metro, schools, kindergartens, hospitals, shops, and everything needed for an active family life. The location combines tranquility, security, and excellent urban infrastructure — an ideal setting for raising children.

The project is a modern, large-scale residential complex offering a variety of apartments with 1, 2, 3, and 4 bedrooms, including homes with their own landscaped yard and penthouses with spacious terraces.

The complex features:
• A playground
• An internal pedestrian courtyard
• Shops and a restaurant with a garden
• Underground and surface parking spaces
• 24/7 management and maintenance

The buildings are built with high-quality materials, excellent insulation, energy-efficient heating and cooling systems, and modern windows, ensuring low running costs, comfort, and a healthy living environment.

"Ohridsko Ezero Park" was created as a true family setting — a space where children have freedom and safety, and parents enjoy peace of mind, convenience, and long-term quality of life.`,
  },
  {
    _id: 'kVAAo3T1WnEJKHhi9idTVd',
    titleEn: 'Garage for Sale, City Center – Osogovo St.',
    descriptionEn: `A garage in central Sofia — Osogovo Street, between Todor Alexandrov Blvd. and Pirotska Street.

Area: 18.30 sq.m.
Separate electricity meter.
Suitable for a car, SUV, or minivan.
Access from a large inner courtyard.

Price: EUR 52,000.
Direct clients only. Commission 1.5%.`,
  },
  {
    _id: 'n1AOZRBLU8dXwpxX58RyK8',
    titleEn: 'Two-Room Apartment B41 — Malinova Dolina',
    descriptionEn: `The apartment has two rooms and is located on the fourth floor. The built-up area of the apartment is 69.48 sq.m, and the total area is 78.37 sq.m. It comprises an entryway, a functional living room with an open kitchen area, a bedroom, a bathroom with toilet, a utility/laundry room, and a terrace. The exposure is west.

Price – EUR 188,088

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'n1AOZRBLU8dXwpxX58RzKi',
    titleEn: 'Two-Room Apartment B15 — Malinova Dolina',
    descriptionEn: `The apartment has two rooms and is located on the first floor. The built-up area of the apartment is 79.93 sq.m, and the total area is 90.79 sq.m. It comprises an entryway, a large living room (36.91 sq.m) with an open kitchen area, a spacious bedroom, a bathroom with toilet, a small storage room, and a terrace. The exposure is south and west, with the living room facing south and west, and the bedroom facing south.
The apartment is very spacious and bright.

Price – EUR 196,106

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'n1AOZRBLU8dXwpxX58S0kK',
    titleEn: 'Two-Room Apartment A13 — Malinova Dolina',
    descriptionEn: `The apartment has two rooms and is located on the first floor. The net area of the apartment is 69.61 sq.m, and the total area is 77.98 sq.m. It comprises an entryway, a living room with an open kitchen area, a bedroom, a bathroom with toilet, a storage/laundry room, and a terrace. The exposure is west.

Price – EUR 168,437

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm296',
    titleEn: 'Three-Room Apartment, Druzhba 2 — Apt. 39',
    descriptionEn: `EXCLUSIVE OFFER FROM NEW KEY PROPERTIES

We present a beautiful three-room apartment with southeast exposure in a new, luxury building by a leading developer — a blend of refined design, quality, and comfort.

THE BUILDING

The building stands out with high-end construction and impressive architecture.

Monolithic reinforced-concrete structure, beam-free frame system

Seismic shear walls positioned to suit the architectural layout

Exterior walls: 25 cm ceramic brick

Interior partition walls: 12 cm

Windows: high-quality PVC with triple glazing

Facade: a combination of elegant Laminam cladding, stone-wool insulation, and water-repellent render

Common areas: natural stone and porcelain stoneware flooring

Heating: central district heating

100 meters from the metro station

THE APARTMENT

Located on the 8th floor of 9, the property impresses with abundant light, spaciousness, and a functional layout.

Total area: 110.46 sq.m.

Net area: 96.38 sq.m.

Exposure: Southeast — guaranteed warmth and coziness all year round.

The property is ideal both as your future home and as a profitable investment.

ADDITIONAL OPTION

Option to purchase an underground garage — extra comfort and security for your car.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm2ay',
    titleEn: 'Three-Room Apartment, Malinova Dolina — Apt. 24 (119 sq.m)',
    descriptionEn: `East/southeast exposure provides good natural light. Layout: entryway, bathroom with toilet, separate WC, utility room, a spacious 32 sq.m living room with kitchen, two bedrooms, and a balcony. Complex amenities: underground parking, green spaces, sports areas, playgrounds, and outdoor fitness equipment. Wienerberger brick, Salamander windows, Orona elevators. Act 14.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm2tY',
    titleEn: 'Three-Room Apartment, Malinova Dolina — Apt. 16 (91.37 sq.m)',
    descriptionEn: `Apartment 16, located in Building B, Entrance B, is set on the fifth residential floor (sixth and top floor of the building) and offers a well-balanced layout with a total area of 91.37 sq.m, of which 79.90 sq.m is net living space. The south/north exposure provides natural light for most of the day, with the living area and one bedroom enjoying a sunny southern exposure, while the second bedroom faces the quieter north side, ideal for rest and relaxation. The high floor adds an extra sense of space and brings in more natural light.
The home features a convenient entryway, a bathroom with toilet, a separate WC, a living room with an open kitchen area, two bedrooms, and a balcony — a space designed for both an active daily routine and calm family moments.
There is an option to purchase a parking space, adding further convenience and comfort to the property.


Price: EUR 219,288.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm3OW',
    titleEn: 'Three-Room Apartment, Dragalevtsi — Apt. 3',
    descriptionEn: `We present a functional and spacious three-room apartment with its own yard (169.15 sq.m) in a new boutique building in the Dragalevtsi district — a blend of refined design, quality, and comfort.

THE BUILDING

${DRAGALEVTSI_BUILDING_BLOCK}

THE APARTMENT

Located on the 1st floor (ground level) of 4, the property impresses with spaciousness and a functional layout.

Total area: 131.33 sq.m.

Net area: 116.25 sq.m.
The apartment comes with its own private yard of 169.15 sq.m, available at an additional price of EUR 35,000.

The property is ideal both as your future home and as a profitable investment.

ADDITIONAL OPTION

Option to purchase an underground garage or parking space.

${DRAGALEVTSI_FOOTER}
Price: EUR 288,000`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm3h6',
    titleEn: 'Three-Room Apartment, Manastirski Livadi West — Apt. 18 (110.49 sq.m)',
    descriptionEn: `L-shaped entryway, spacious 35.2 sq.m living room with kitchen, master bedroom with bathroom, second bedroom, bathroom with toilet, terrace. Construction: Wienerberger Porotherm 25 cm brick, 12 cm BAUMIT insulation, ETEM E75 aluminum windows with triple glazing, gas-fired underfloor heating, two KONE elevators (8-person). Act 14; expected Act 15: March 2027, Act 16: September 2027.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm3tU',
    titleEn: 'Penthouse, Ohridsko Ezero 3 — Apt. 61 (302.40 sq.m)',
    descriptionEn: `A true family setting. A spacious, bright living room with kitchen area, four bedrooms (two with walk-in closets, one with an en-suite bathroom), a separate bathroom, and a storage room. Complex amenities: underground parking (2 levels), round-the-clock security with video surveillance and a mobile patrol, modern heating/cooling, and an elevator.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm45s',
    titleEn: 'Penthouse, Ohridsko Ezero 3 — Apt. 74 (302.40 sq.m)',
    descriptionEn: `A spacious and bright penthouse. Living room with kitchen, four bedrooms (three with walk-in closets, one with an en-suite bathroom), a separate bathroom, a storage room, and a large wraparound terrace. Gypsum-lime plaster, cement screed, underfloor heating, a Toshiba heat pump, electrical and plumbing installations, an armored door, Schindler elevators, luxurious common areas, 2-level underground parking, and 24-hour video-monitored security.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm4IG',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. V06 (107.01 sq.m)',
    descriptionEn: `Apartment V06
The apartment has three rooms and is located on the second floor (first above ground level). The built-up area is 91.53 sq.m, and the total area is 107.01 sq.m. It comprises an L-shaped hallway, a living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a large terrace. The exposure is south.
The apartment comes with a storage room of 3.32 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm5Ua',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. V36 (175.27 sq.m)',
    descriptionEn: `Apartment V36
The apartment has three rooms and is located on the seventh floor (sixth above ground level). The built-up area is 149.86 sq.m, and the total area is 175.27 sq.m. It comprises a hallway, a living room with an open kitchen area, a master bedroom with a walk-in closet and en-suite bathroom, a second bedroom, a bathroom with toilet, a storage closet, and a huge terrace (47.5 sq.m). The exposure is south, east, and north, with the living room facing south and east, one bedroom facing east and north, and the other facing south.
The apartment comes with a storage room of 5.06 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm6RQ',
    titleEn: 'Two-Room Apartment, Sozopol — 75 sq.m',
    descriptionEn: `A two-room apartment in Sozopol — a perfect location for a holiday home. Contact us for the current price and further information.`,
  },
  {
    _id: 'o3mQPUBUBxVVo14n0jm6tI',
    titleEn: 'Two-Room Apartment for Rent, G.S. Rakovski St., City Center',
    descriptionEn: `A spacious and stylish two-room apartment in central Sofia. East-west exposure — natural light throughout the day. Fully furnished and move-in ready. Separate kitchen. Brick construction. Perfect for tenants seeking comfort, location, and prestige.`,
  },
  {
    _id: 'p405SDaG7PliHISVF9o0QG',
    titleEn: 'Three-Room Apartment B10 — Malinova Dolina',
    descriptionEn: `The apartment has three rooms and is located on the first floor. The net area of the apartment is 88.47 sq.m, and the total area is 99.79 sq.m. It comprises an L-shaped hallway, a compact but functional living room with an open kitchen area, two bedrooms — one large, with space for an open wardrobe area — a bathroom with toilet, a utility/laundry room, and a terrace. The exposure is north and east, with both bedrooms facing north and the living room facing north and east.

Price – EUR 191,600

${HANDOVER_BLOCK}`,
  },
  {
    _id: 'vVKkUeQokL8IrJ29QLOx5y',
    titleEn: 'Residential Building in Ovcha Kupel 2',
    descriptionEn: `A newly built residential building located in the Ovcha Kupel 2 district, close to President Lincoln Blvd.

Available for sale:
• Two-room apartments from 70.89 sq.m gross (including an assigned storage room) — from €172,500; 2 apartments available.
• Three-room apartments from 107.01 sq.m gross (including an assigned storage room) — from €216,700; 23 apartments available.
• Offices from 71.91 sq.m gross (including an assigned storage room) — from €134,200; 5 offices available.
• Parking spaces and garages (14.40 sq.m) — from €19,000; 30 units available.

Construction and materials:
Brick masonry — exterior walls: Wienerberger Porotherm ceramic brick, 25 cm; interior walls: 12 cm ceramic brick. Facade: Baumit/Ceresit system with 12 cm EPS insulation. Windows: PVC, six-chamber profile, triple glazing, German manufacturer.

Apartments: cement screed flooring, gypsum plaster on walls/ceilings, armored front door with MDF veneer and threshold, porcelain stoneware terrace flooring. Handed over plastered and screeded, without interior doors.

Garages: automatic garage door, polished concrete flooring, lime-cement plaster.

Heating and cooling: district heating — distribution and building installation in place; aluminum radiators; connections for air conditioning/heat pumps.

Elevators: 1 per entrance, 8-person capacity, electric "ORONA".

Common areas: gypsum skim coat and latex paint on walls/ceilings, granite/porcelain stoneware flooring, metal railing, per the interior design project.

Construction stage: Act 14.
Expected timeline: Act 15 — September 2027; Act 16 — February 2028.`,
  },
  {
    _id: 'vVKkUeQokL8IrJ29QLmeeZ',
    titleEn: 'Three-Room Apartment, Manastirski Livadi West — Apt. 18',
    descriptionEn: `Apartment 18 has three rooms and is located on the third floor (second above ground level). The living area is 98.27 sq.m, and the total area is 110.49 sq.m. It comprises an L-shaped entryway, a large (35.2 sq.m) living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a terrace. The exposure is east and north — the living room faces east and north, one bedroom faces east, and the other faces north.

${BUILDING_BLOCK_2}`,
  },
  {
    _id: 'zsiuL2rShLu6GF5Z47JhxU',
    titleEn: 'Three-Room Apartment, Ovcha Kupel 2 — Apt. A15 (108.10 sq.m)',
    descriptionEn: `Apartment A15
The apartment has three rooms and is located on the fourth floor (third above ground level). The built-up area is 92.45 sq.m, and the total area is 108.10 sq.m. It comprises an L-shaped hallway, a spacious (28.2 sq.m) living room with an open kitchen area, a master bedroom with an en-suite bathroom, a second bedroom, a bathroom with toilet, and a terrace. The exposure is south and north, with the living room facing south, and both bedrooms facing north.
The apartment comes with a storage room of 3.32 sq.m, included in the price.

${BUILDING_BLOCK_1}`,
  },
]

async function run() {
  let ok = 0
  let failed = 0
  for (const { _id, titleEn, descriptionEn, featuresEn } of listings) {
    const patch = { titleEn, descriptionEn }
    if (featuresEn) patch.featuresEn = featuresEn
    try {
      await client.patch(_id).set(patch).commit()
      console.log(`✅  ${_id} — ${titleEn}`)
      ok++
    } catch (err) {
      console.error(`❌  ${_id} failed:`, err.message)
      failed++
    }
  }
  console.log(`\nDone. ${ok} patched, ${failed} failed (of ${listings.length} total).`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('❌  Fatal:', err.message)
  process.exit(1)
})
