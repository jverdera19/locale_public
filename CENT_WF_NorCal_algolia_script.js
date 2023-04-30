let vendorTest
const { autocomplete, getAlgoliaResults, getAlgoliaFacets } =
    window['@algolia/autocomplete-js']
const appId = '09BBTSQZXQ'
const apiKey = '099bc02c1366e54cb2e1e3975b0a8866'
const searchClient = algoliasearch(appId, apiKey)
const indexName = 'BA Products'
const vendorIndexName = 'BA Vendors'

const { setIsOpen } = autocomplete({
    container: '#autocomplete',
    placeholder: 'Search for your favorite foods or vendors',
    detachedMediaQuery: '',
    openOnFocus: true,

    // render({ elements, render, html }, root) {
    //     const { vendors, products } = elements

    //     // Display single column if no results for vendors or products
    //     if (
    //         vendors &&
    //         products &&
    //         vendors.props.children[1].type == 'div' &&
    //         products.props.children[1].type == 'div'
    //     ) {
    //         render(
    //             html`<div
    //                     class="aa-PanelLayout aa-Panel--scrollable"
    //                     data-autocomplete-source-id="empty_search"
    //                 >
    //                 <div class="aa-PanelSections">
    //                     <div class="widget_results_container empty">
    //                     <div class="div-block-634 both-empty">
    //                         <div class="text-block-216">
    //                             We couldn't find anything, have a suggestion?
    //                             Share it here!
    //                         </div>
    //                         <div class="div-block-633">
    //                             <div class="search-input empty">
    //                                 <div class="widget_search_text">
    //                                     Your suggestion<br />
    //                                 </div>
    //                             </div>
    //                             <a
    //                                 href="#"
    //                                 class="submit-button-11-copy w-button"
    //                                 >SUBMIT</a
    //                             >
    //                         </div>
    //                     </div>
    //                     </div>
    //                 </div>
    //             </div>`,
    //             root
    //         )
    //     } else if (vendors && vendors.props.children[1].type == 'div') {
    //         render(
    //             html`<div class="aa-PanelLayout aa-Panel--scrollable">
    //                 <div class="aa-PanelSections">
    //                     <div class="aa-PanelSection--left">
    //                         <!-- Start -->
    //                         <section
    //                             class="aa-Source"
    //                             data-autocomplete-source-id="vendors"
    //                         >
    //                             <div class="aa-SourceHeader">Vendors</div>

    //                             <div class="widget_vendor_container">
    //                                 <div class="div-block-634">
    //                                     <div class="text-block-216">
    //                                         We couldn't find anything, have a
    //                                         suggestion? Share it here!
    //                                     </div>
    //                                     <div class="div-block-633 vertical">
    //                                         <div class="search-input vertical">
    //                                             <div class="widget_search_text">
    //                                                 Your suggestion<br />
    //                                             </div>
    //                                         </div>
    //                                         <a
    //                                             href="#"
    //                                             class="submit-button-11-copy w-button"
    //                                             >SUBMIT</a
    //                                         >
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </section>

    //                         <!-- End -->
    //                     </div>
    //                     <div class="aa-PanelSection--right">${products}</div>
    //                 </div>
    //             </div>`,
    //             root
    //         )
    //     } else {
    //         render(
    //             html`<div class="aa-PanelLayout aa-Panel--scrollable">
    //                 <div class="aa-PanelSections">
    //                     <div class="aa-PanelSection--left">${vendors}</div>
    //                     <div class="aa-PanelSection--right">${products}</div>
    //                 </div>
    //             </div>`,
    //             root
    //         )
    //     }
    // },
    getSources({ query, state }) {
        if (!query) {
            return [
                {
                    sourceId: 'default_vendors',
                    getItems() {
                        return [
                            {
                                vendor_name: 'Model Bakery',
                                vendor_slug: 'ba-model-bakery',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a5944ea6656794d7c5db0_e4gy0mW2Ow9jh2w-1wpLOH-u_1K50XQ0i6n9yk_erpQ.png',
                                vendor_products_array:
                                    '["Blueberry Scone", "Sourcream Cinnamon Muffin", "Cranberry Buttermilk Scone", "Apple Butterhorn", "Blueberry Muffin", "Banana Walnut Muffin", "White Chocolate Hazelnut Cookie", "Apricot Pecan Scone", "Morning Glory Muffin", "Lemon Bar", "Oatmeal Raisin Scone", "Morning Bun", "Raspberry Pinwheel", "Chocolate Chip Cookie (no nuts)", "Model Bakery\'s Famous English Muffin", "Model Bakery\'s Famous English Muffins (Save $2 with 6 pack)", "Mexican Wedding Cookie", "Bearclaw", "Carmelita Bar", "Molasses Ginger Cookie"]',
                                objectID:
                                    'a86f4e69920bf_dashboard_generated_id',
                            },
                            {
                                "vendor_name": "b. patisserie",
                                "vendor_slug": "ba-b-patisserie",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6414bb268bd00d0a24339ffd_Kk96S8TwFpSYXtlDZbv02TvxHhTLOWRF7J3Q036voV8.png",
                                "vendor_products_array": "[\"Granola\", \"Signature Box\", \"Classic Kouign Amann Box\", \"Mixed Kouign Amann Box\"]",
                                "objectID": "1517be13837576_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Pizzeria Delfina",
                                "vendor_slug": "ba-pizzeria-delfina",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a59278a6c881512c56037_y3oQ8-RUP-xHLGIPgY6KKZFJjkpPRF0XqYJ-rT2zZu0.png",
                                "vendor_products_array": "[\"Latkes with Pear and Quince Conserva\", \"Pomodoro Sauce\", \"Broccoli Rabe Pizza\", \"Margherita Pizza\", \"4 Formaggi Pizza\", \"Funghi Pizza\", \"Napoletana Pizza\", \"Pear and Quince Conserva\", \"Famous Delfina Potato Latkes\", \"Gemini Pizza\", \"Insalata Tricolore Salad\", \"Delfina's Potato Gnocchi\"]",
                                "objectID": "1090ade1957f1_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Monterey Fish Market",
                                "vendor_slug": "ba-monterey-fish-market",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a593ecda49ce51b7f90b7_JWZkVCqIbgK-JcDfL5ktrUIRWsejOcGkwQpBjFc66Js.jpeg",
                                "vendor_products_array": "[\"Bodega Rockfish\", \"White Sturgeon Caviar\", \"Swordfish Steaks\", \"Salmon Burger Patty\", \"Parsley Garlic Marinated Gulf Shrimp\", \"New Bedford Scallops\", \"Lobster Tails from Maine\", \"Ft Bragg Petrare Sole\", \"Fort Bragg Picked Crab\", \"Wild Alaskan Halibut\", \"Crab Cakes\", \"Half Moon Bay Black Cod\", \"Catfish\", \"British Columbia King Farmed Salmon\", \"Wild Alaskan True Cod\", \"Lemon Ginger Halibut with Brussels Sprouts Meal Kit for Two\", \"Lemon Ginger Halibut with Brussels Sprouts Meal Kit for One\", \"Farmed Trout\", \"Cooked Octopus Tentacles\", \"Balmoral Smoked Salmon\", \"Local Halibut Fillet\", \"Cocktail Sauce\", \"Canadian Atlantic Farmed Salmon\", \"Branzino\"]",
                                "objectID": "ab0d7a7b1799_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Pop Pie Co",
                                "vendor_slug": "ba-pop-pie-co",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a5922e6a5017c498c1ee1_X2nN8AAFAUZmh75WvEf9cBOMyrZUP0gXnR3fkvE2sZI.png",
                                "vendor_products_array": "[\"Classic Chicken Pot Pie\", \"Steak and Ale Pot Pie\", \"Roasted Veggies & Yellow Curry Pie\", \"Mushroom & Ricotta Pizza Pot Pie\", \"Traditional Aussie Pie\"]",
                                "objectID": "a4b4b1554894b_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Gjusta",
                                "vendor_slug": "ba-gjusta",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/641e2b4fe1991c3b653705b1_4MYSCu2mF3_yvfvCOi5sh5r7zGiuWlstR1tBmkdg7nU.png",
                                "vendor_products_array": "[\"Eggplant Bake\", \"Vegetarian Lasagna\", \"Olive Oil Hummus\", \"Meatballs\", \"Honey Butter\", \"Kimchi\", \"Marinated Grilled Peppers\", \"Marinated Mixed Olives\", \"Beef Lasagna\", \"Whipped Goat Cheese & Walnuts\", \"Minestrone Soup\", \"Baba Ganoush\", \"Chicken Dumpling Soup\", \"Tuna Conserva Salad\"]",
                                "objectID": "e015690f33079_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Lord Empanada",
                                "vendor_slug": "ba-lord-empanada",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6414966cc92f0cc9a3108000_qTqE-gDAPjY_OgBinpF4GjjEtd3l_Uf4cGDnKcQ2d4I.png",
                                "vendor_products_array": "[\"Beef Empanadas\", \"Spinach & Cheese Empanadas (Vegetarian)\", \"Chicken Empanadas\", \"Spicy Black Bean Empanadas (Vegan)\"]",
                                "objectID": "1091c723b3561c_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Manresa Bread",
                                "vendor_slug": "ba-manresa-bread",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a594afcee39868b7e1cbf_7fm8EcZgjt4oWPr07HKNqtLX88X-NmQwUYv2InnwogA.png",
                                "vendor_products_array": "[\"Gluten Free Poppy Seed Raspberry Muffin\", \"Sourdough Bread\", \"Manresa Almond Croissant\", \"Monkey Bread\", \"Herb Potato and Parmesan Quiche\", \"Sourdough Baguette\", \"Herb Potato and Parmesan Quiche Slice\", \"Chocolate Cherry Granola\", \"Chocolate Croissant\", \"Lorraine Quiche\", \"Kouign Amann\", \"Butter Croissant\", \"Olive Ciabatta Loaf\", \"Almond Granola\", \"Lorraine Whole Quiche\", \"Puff Pastry Biscuit\"]",
                                "objectID": "fb3ff3e72a546_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "La Méditeranée",
                                "vendor_slug": "ba-la-mediteranee",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a595c3b272e7b102e043e_XO4mRFFVtPyKfqlpsUyjdwJNotzYea99NKLGuD5-pe8.jpeg",
                                "vendor_products_array": "[\"Hummus Plate\", \"Salmon Kebabs\", \"Tabuleh\", \"Lamb Burger Roll\", \"Saffron Chicken Kebabs (Mary's Free-Range Chicken Breast)\", \"Baba Ghanoush\", \"Pita Bread\", \"Pomegranate Chicken Dinner\", \"Pistachio Nest Dessert\", \"Lebanese Kibbeh Meatballs\", \"Lamb Lule Meatballs Dinner\", \"Djajiki Cucumber Yogurt Dip\", \"Heavenly Baklava Nest\", \"Chicken Cilicia Fillo Pastries\", \"Spinach & Feta Fillo Pastries (Spanikopita)\"]",
                                "objectID": "320148d61f423_dashboard_generated_id"
                            },
                            {
                                "vendor_name": "Di Fara Pizza",
                                "vendor_slug": "ba-di-fara-pizza",
                                "vendor_logo_url": "https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6419d5ec7724f400761c5230_c92X0ORC7b8Krgti_YNmaIhiDoMaayySWkmQBDAJtt4.png",
                                "vendor_products_array": "[\"Sicilian Pizza with Pepperoni\", \"Di Fara Margherita Pizza\", \"Sicilian Pizza\", \"Di Fara's Famous White Pie\", \"New York Style Veggie Pie\", \"New York Style Pepperoni Pizza\"]",
                                "objectID": "1e1d753ab75d27_dashboard_generated_id"
                            }
                        ]
                    },
                    getItemUrl({ item }) {
                        return item.url
                    },
                    templates: {
                        header() {
                            return 'Popular Vendors'
                        },
                        item({ item, components, html }) {
                            return html`
                                <a
                                    class="aa-ItemLink"
                                    href="/vendor/${item.vendor_slug}"
                                >
                                    <div class="widget_vendor">
                                        <div class="widget_image_vendor">
                                            <img
                                                alt=""
                                                data-src="${item.vendor_logo_url}"
                                                class="lazy entered loaded"
                                                data-ll-status="loaded"
                                                src="${item.vendor_logo_url}"
                                            />
                                        </div>
                                        <div class="pc_name">
                                            ${item.vendor_name}
                                        </div>
                                    </div>
                                </a>
                            `
                        },
                        noResults() {
                            return 'No products for this query.'
                        },
                    },
                },
                {
                    sourceId: 'default_products',
                    getItems() {
                        return [
                            {
                                product_url_slug:
                                    'ba-model-bakerys-famous-english-muffins-save-with-6-pack',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6430a5f760288efb7c9742a8_KMuYX11Mu4I9H00t8rIH3uL7pHSVeoxXBLNjztazwn8.jpeg',
                                vendor_name: 'Model Bakery',
                                product_name_adj:
                                    "Model Bakery's Famous English Muffins (Save $2 with 6 pack)",
                                serving_size: '6 Muffins',
                                vendor_city: 'Napa Valley, CA',
                                full_website_description:
                                    "Model Bakery's Famous English Muffins are a beloved treat enjoyed by generations of customers. They are made with the …",
                                normal_website_price: '$19',
                            },
                            {
                                product_url_slug: 'ba-large-gem-avocados',
                                product_name_adj:
                                    'Sold out - Large Gem Avocados',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/643997cb435533af1ee88e50_8AD8h-4LH1UsxzgUV8lS78VXuUQpoB2LSrwmX5cilB8.jpeg',
                                vendor_name: 'Brokaw Ranch',
                                vendor_city: 'Santa Paula, CA',
                                serving_size: '2 count',
                                full_website_description:
                                    'The Large Gem Avocado from Brokaw Ranch is a true treasure among avocados. Grown with care in the lush orchards …',
                                normal_website_price: 4,
                            },
                            {
                                product_id: 'recN3yWqBpSG19Z9Q',
                                product_url_slug:
                                    'ba-hachis-parmentier-shepards-pie',
                                product_name: 'Hachis Parmentier Shepards Pie',
                                product_name_adj:
                                    'Hachis Parmentier Shepards Pie',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6442c6cf7b047bdaafee150e_XT7_Yvs8mWy9v19z7PNWLAAkPXGl2GkFdRAQuG-lhhc.jpeg',
                                vendor_name: 'Tarts De Feybesse',
                                vendor_city: 'Vallejo, CA',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a58fe7f99922c75b7fc5b_QpeL-iK8-i42ATwsi1vPhudNw2qgX-vkx--vOZi8jrQ.png',
                                vendor_slug: 'ba-tarts-de-feybesse',
                                ingredients:
                                    'Beef, Red Wine, Carrots, Onions, Celery, Tomato, Potatoes, Herbs, Dairy, Seasonings',
                                serving_size: '4 oz',
                                parent_category_name_array:
                                    '["New", "Bakery & Sweets", "April Top Products"]',
                                product_category_name_array:
                                    '["New || Limited", "Cakes, Pies & Tarts"]',
                                product_label_name_array: '["New this Week"]',
                                full_website_description:
                                    "Satisfy your cravings for hearty, comforting French cuisine with Tarts De Feybesse's Hachis Parmentier – the French equivalent of …",
                                normal_website_price: 16,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 0,
                                objectID:
                                    '198e90bb5f4d5f_dashboard_generated_id',
                            },
                            {
                                product_id: 'reczPHrZIhmrYJLAx',
                                product_url_slug: 'ba-asparagus',
                                product_name: 'Asparagus',
                                product_name_adj: 'Asparagus',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/64398ed62b0f9395b615d923_4Up0ea8EQKlFFUzIMLENDV45XY2LuS5j1_JvUFGFwgw.jpeg',
                                vendor_name: 'Durst Organic Growers',
                                vendor_city: '',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a5998a9e7f17af20a6aff_mukcai0vTwXjHd3rmRSOhQ7bj1OzySyVVbD_JcH6DmQ.png',
                                vendor_slug: 'ba-durst-organic-growers',
                                ingredients: '',
                                serving_size: '1 bunch',
                                parent_category_name_array:
                                    '["New", "Farmers Market"]',
                                product_category_name_array:
                                    '["New || Limited", "Fresh Produce"]',
                                product_label_name_array: '',
                                full_website_description:
                                    'Durst Organic Farm takes great pride in their specialty crop, the asparagus, which is only available in the spring and early summer…',
                                normal_website_price: 4,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 0,
                                objectID:
                                    'b71e1fdefa193_dashboard_generated_id',
                            },
                            {
                                product_id: 'recFT9CvvYAPu4u9o',
                                product_url_slug:
                                    'ba-clam-chowder-and-bread-bowls-for2',
                                product_name:
                                    'Clam Chowder and Bread Bowls for 2 (Save $4)',
                                product_name_adj:
                                    'Clam Chowder and Bread Bowls for 2 (Save $4)',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6427278ade84c4365b398a7a_3f8ZGJRsu5Ptjh1JXg1xXGCLSmEmnd8gxmzjy_PGkjE.jpeg',
                                vendor_name: 'Splash Cafe',
                                vendor_city: 'Pismo Beach, CA',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/642720d0683001afc3485101_9p1uyLk71oliw54hsXLi3H3gSitIoKgIyimf7zKQ0Ao.png',
                                vendor_slug: 'ba-splash-cafe',
                                ingredients:
                                    'Clam Chowder:\nWater, Heavy Cream (Cream, Carrageenan), Potatoes (Potatoes, Sodium Acid Pyrophosphate), Chopped Ocean Clams (Clams, Clam Juice, Salt, Calcium Disodium Edta), Sea Clams (Clams, Clam Juice, Water), Chopped Clams (Ocean Clams, Ocean Clam Juice, Water), Modified Cornstarch, Pollock, Celery, Soybean Oil, Butter (Cream, Natural Flavoring), Margarine (Soybean Oil, Hydrogenated Soybean Oil, Water, Salt, Mono & Diglycerides, Soy Lecithin, Sodium Benzoate (Preservative), Natural And Artificial Flavor, Beta-carotene (Color), Vitamin A Palmitate), Salt, Enriched Flour (Bleached Wheat Flour, Malted Barley Flour, Niacin, Iron, Thiamine Mononitrate, Riboflavin, Folic Acid), Seasoning (Salt, Dehydrated Onion, Hydrolyzed Wheat Protein, Spice, Autolyzed Yeast, Disodium Guanylate And Inosinate, Dehydrated Garlic, Natural Flavor), Titanium Dioxide (Color), Parsley, Natural And Artificial Flavors. Allergens: Contains Milk, Wheat, Soy, Fish (Pollock), Mollusk (Clam).\n\nBread Bowl:\nFlour, Water, Sourdough Starter, Yeast, Salt. Allergens: Contains Wheat',
                                serving_size: '32 fl oz chowder',
                                parent_category_name_array:
                                    '["Meals", "Bakery & Sweets", "April Top Products"]',
                                product_category_name_array:
                                    '["Quick Meals", "Breads"]',
                                product_label_name_array: '',
                                full_website_description:
                                    "Splash Cafe's Clam Chowder and Bread Bowls for 2 is the perfect meal to share with a friend or loved one. Each bowl is crafted using…",
                                normal_website_price: 22,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 0,
                                objectID:
                                    '912e9445e7e38_dashboard_generated_id',
                            },
                            {
                                product_id: 'reczLVV7MC1q13WyV',
                                product_url_slug:
                                    'ba-famous-baked-bbq-pork-buns',
                                product_name: 'Famous Baked BBQ Pork Buns',
                                product_name_adj: 'Famous Baked BBQ Pork Buns',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/64270bb5a9237538211c18c6_2BpnnVIWdHjmP3fpcUyhD8GctJ2El3xoJ7qSXBWGU4k.jpeg',
                                vendor_name: 'Mong Kok Bakery',
                                vendor_city: 'San Francisco, CA',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a594099434c85a354dc48_vNfe_vCCYKd76uB4oWxfNCGyPAyFxBlCSwc3zm_oeZs.png',
                                vendor_slug: 'ba-mong-kok-bakery',
                                ingredients: '',
                                serving_size: '',
                                parent_category_name_array:
                                    '["Bakery & Sweets", "Cuisines", "Founders Picks", "Treats Under $15", "Most Popular", "Trending This Week", "Gifts", "Trending Treats Under $20", "March Top Products", "April Top Products"]',
                                product_category_name_array:
                                    '["Breads", "East Asian", "Most Popular Bakery", "Treats Under $15", "Build your own box"]',
                                product_label_name_array: '["Jonny Pick"]',
                                full_website_description:
                                    'A popular Chinese-style pastry that consists of a soft, fluffy bun filled with a delicious barbecue pork. The filling is made with…',
                                normal_website_price: 10,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 570,
                                objectID:
                                    '1dee520b53b048_dashboard_generated_id',
                            },
                            {
                                product_id: 'recIZW7CHVoU8T2D4',
                                product_url_slug:
                                    'ba-organic-sweet-baby-broccoli',
                                product_name: 'Organic Sweet Baby Broccoli',
                                product_name_adj: 'Organic Sweet Baby Broccoli',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6430377a05d51167224de974_Pxx1yal6uEyAWnmfNvZPbcLM3bM9P_P_LCrd-CIkyMk.jpeg',
                                vendor_name: "Narci's Organics",
                                vendor_city: '',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a593d06cea40f61d69061_McB-lo763xWjktaZPvx0Sc1dnFgC-DKjxqUXUuAX4R4.png',
                                vendor_slug: 'ba-narcis-organics',
                                ingredients: '',
                                serving_size: '1 bunch',
                                parent_category_name_array:
                                    '["Farmers Market", "Healthy", "March Top Products", "Deals", "April Top Products"]',
                                product_category_name_array:
                                    '["Fresh Produce", "Affordable Farmers Market Items", "Best Deals"]',
                                product_label_name_array: '',
                                full_website_description:
                                    'The powerhouse vegetable. Bunched broccoli is likely the kind that comes to mind when you think of the veggie. The whole head is…',
                                normal_website_price: 4,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 264,
                                objectID:
                                    '170223f74abff0_dashboard_generated_id',
                            },
                            {
                                product_id: 'recpiCkT5gIcRPJ4V',
                                product_url_slug: 'ba-organic-sugar-snap-peas2',
                                product_name: 'Organic Sugar Snap Peas',
                                product_name_adj: 'Organic Sugar Snap Peas',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6442c96a952d0115c52fbbff_fEoFLj_NWirPe9CBen7flCZHAbHAlQgF5Oqgkf8fL9E.jpeg',
                                vendor_name: 'Tutti Frutti',
                                vendor_city: '',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6442c6c0f73584120bab060a_48H4bqYK52Yw8qQIh5TdiGQoPfRgbv3zeOFFM3kFVVE.png',
                                vendor_slug: 'ba-tutti-frutti',
                                ingredients: '',
                                serving_size: '1 lb',
                                parent_category_name_array:
                                    '["New", "Farmers Market"]',
                                product_category_name_array:
                                    '["New || Limited", "Fresh Produce"]',
                                product_label_name_array: '["New this Week"]',
                                full_website_description:
                                    'Organic Sugar Snap Peas from Tutti Frutti Farms are the perfect snack for any occasion, delivering a sweet and crisp taste that…',
                                normal_website_price: 8,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 0,
                                objectID:
                                    '1a21e2bb0e5617_dashboard_generated_id',
                            },
                            {
                                product_id: 'recxRqNl79mhtI4HQ',
                                product_url_slug: 'ba-tea-leaf-salad-',
                                product_name: 'Tea Leaf Salad ',
                                product_name_adj: 'Tea Leaf Salad ',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/64306104878c5083945d8ccf_D9ycobPcDqo0-9sosgLFWO4rfKYGNUSZAbpT-vWGFLE.jpeg',
                                vendor_name: 'Burma Superstar',
                                vendor_city: 'San Francisco, CA',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a59bc67c70510f8a25273_VV94dEprvVriykTYhXLFgEcsBXNPnRW_tWnal0iIOL4.png',
                                vendor_slug: 'ba-burma-superstar',
                                ingredients: '',
                                serving_size: 'Serves 1-2',
                                parent_category_name_array:
                                    '["Meals", "Founders Picks", "Healthy", "Most Popular", "Trending This Week", "Gifts", "Trending Treats", "Diet", "Deals", "April Top Products"]',
                                product_category_name_array:
                                    '["Healthy Meals", "Most Popular Meals", "Salad", "Build your own box", "Gluten-Free", "Dairy-Free", "Sales This Week"]',
                                product_label_name_array:
                                    '["Chris Picks", "This Week Only"]',
                                full_website_description:
                                    'A house special! This salad is a flavorful and healthy way to enjoy your favorite tea leaves. Fried garlic, peanuts, sunflower seeds…',
                                normal_website_price: 22,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 80,
                                objectID:
                                    'fb4a7cdd53e34_dashboard_generated_id',
                            },
                            {
                                product_id: 'recTHBcpiH1xBPPlN',
                                product_url_slug:
                                    'ba-asparagus-vichysoisse-soup',
                                product_name: 'Asparagus Vichysoisse Soup',
                                product_name_adj: 'Asparagus Vichysoisse Soup',
                                product_image:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6442c6c45300f9f431d7914f_kor12nQr9gzToUO8RlG55y8yZW6aRlztgeZWpCOQUVo.jpeg',
                                vendor_name: 'Tarts De Feybesse',
                                vendor_city: 'Vallejo, CA',
                                vendor_logo_url:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a58fe7f99922c75b7fc5b_QpeL-iK8-i42ATwsi1vPhudNw2qgX-vkx--vOZi8jrQ.png',
                                vendor_slug: 'ba-tarts-de-feybesse',
                                ingredients:
                                    'Asparagus, potatoes, dairy, alliums, herbs, seasoning',
                                serving_size: '1 quart',
                                parent_category_name_array: '["New", "Meals"]',
                                product_category_name_array:
                                    '["New || Limited", "Quick Meals", "Healthy Meals"]',
                                product_label_name_array: '["New this Week"]',
                                full_website_description:
                                    "Delight your taste buds with the elegant simplicity of Tarts De Feybesse's Asparagus Vichysoisse – a light and silky smooth soup made from…",
                                normal_website_price: 17.5,
                                website_locale_name: 'Bay Area',
                                sold_out_flag: 0,
                                gmv_last_7: 0,
                                objectID:
                                    '756ba3a28a280_dashboard_generated_id',
                            },
                        ]
                    },
                    templates: {
                        header() {
                            return 'Popular Foods This Week'
                        },
                        item({ item, components, html }) {
                            return html`<a
                                class="aa-ItemLink"
                                href="/product/${item.product_url_slug}"
                            >
                                <div class="widget_product">
                                    <a href="/product/${item.product_url_slug}">
                                        <img
                                            class="widget_product_image_algolia"
                                            src="${item['product_image']}"
                                            alt="${item.product_name_adj}"
                                            width="144"
                                            height="100"
                                        />
                                    </a>

                                    <div class="div-block-625">
                                        <div class="div-block-626">
                                            <div
                                                class="widget_product_name_vendor"
                                            >
                                                <div
                                                    class="widget_product_vendor"
                                                >
                                                    ${components.Snippet({
                                                        hit: item,
                                                        attribute:
                                                            'vendor_name',
                                                    })}
                                                </div>
                                                <div
                                                    class="widget_product_name_servings"
                                                >
                                                    <div
                                                        class="widget_product_name"
                                                    >
                                                        ${components.Snippet({
                                                            hit: item,
                                                            attribute:
                                                                'product_name_adj',
                                                        })}
                                                        <br />
                                                    </div>
                                                    <div
                                                        class="widget_product_details"
                                                    >
                                                        <div
                                                            class="widget_product_detail"
                                                        >
                                                            ${components.Snippet(
                                                                {
                                                                    hit: item,
                                                                    attribute:
                                                                        'serving_size',
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="widget_product_price_location"
                                            >
                                                <div class="pc_price">
                                                    ${item.normal_website_price}
                                                </div>
                                                <div
                                                    class="widget_location_container"
                                                >
                                                    <div
                                                        class="black-location-icon product-component"
                                                    ></div>
                                                    <div
                                                        class="widget_product_detail"
                                                    >
                                                        ${components.Snippet({
                                                            hit: item,
                                                            attribute:
                                                                'vendor_city',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget_product_detail">
                                            ${components.Snippet({
                                                hit: item,
                                                attribute:
                                                    'full_website_description',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </a>`
                        },
                        noResults() {
                            return 'No products for this query.'
                        },
                    },
                    getItemUrl({ item }) {
                        return '/product/' + item.product_url_slug
                    },
                },
            ]
        }

        return [
            {
                sourceId: 'vendors',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: vendorIndexName,
                                query,
                                params: {
                                    snippetEllipsisText: '…',
                                    hitsPerPage: 10,
                                },
                            },
                        ],
                    })
                },
                templates: {
                    header() {
                        return 'Vendors'
                    },
                    item({ item, components, html }) {
                        return html`
                            <a
                                class="aa-ItemLink"
                                href="/vendor/${item.vendor_slug}"
                            >
                                <div class="widget_vendor">
                                    <div class="widget_image_vendor">
                                        <img
                                            alt=""
                                            data-src="${item.vendor_logo_url}"
                                            class="lazy entered loaded"
                                            data-ll-status="loaded"
                                            src="${item.vendor_logo_url}"
                                        />
                                    </div>
                                    <div class="pc_name">
                                        ${item.vendor_name}
                                    </div>
                                </div>
                            </a>
                        `
                    },
                    noResults() {
                        return 'No vendors for this query.'
                    },
                },
                getItemUrl({ item }) {
                    return '/vendor/' + item.vendor_slug
                },
            },
            {
                sourceId: 'products',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: indexName,
                                query,
                                params: {
                                    attributesToSnippet: [
                                        'product_name_adj:10',
                                        'full_website_description:15',
                                    ],
                                    snippetEllipsisText: '…',
                                    hitsPerPage: 40,
                                },
                            },
                        ],
                    })
                },
                templates: {
                    header() {
                        return 'Products'
                    },
                    item({ item, components, html }) {
                        return html`<a
                            class="aa-ItemLink"
                            href="/product/${item.product_url_slug}"
                        >
                            <div class="widget_product">
                                <a href="/product/${item.product_url_slug}">
                                    <img
                                        class="widget_product_image_algolia"
                                        src="${item['product_image']}"
                                        alt="${item.product_name_adj}"
                                        width="144"
                                        height="100"
                                    />
                                </a>

                                <div class="div-block-625">
                                    <div class="div-block-626">
                                        <div class="widget_product_name_vendor">
                                            <div class="widget_product_vendor">
                                                ${components.Snippet({
                                                    hit: item,
                                                    attribute: 'vendor_name',
                                                })}
                                            </div>
                                            <div
                                                class="widget_product_name_servings"
                                            >
                                                <div
                                                    class="widget_product_name"
                                                >
                                                    ${components.Snippet({
                                                        hit: item,
                                                        attribute:
                                                            'product_name_adj',
                                                    })}
                                                    <br />
                                                </div>
                                                <div
                                                    class="widget_product_details"
                                                >
                                                    <div
                                                        class="widget_product_detail"
                                                    >
                                                        ${components.Snippet({
                                                            hit: item,
                                                            attribute:
                                                                'serving_size',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="widget_product_price_location"
                                        >
                                            <div class="pc_price">
                                                $${item.normal_website_price}
                                            </div>
                                            <div
                                                class="widget_location_container"
                                            >
                                                <div
                                                    class="black-location-icon product-component"
                                                ></div>
                                                <div
                                                    class="widget_product_detail"
                                                >
                                                    ${components.Snippet({
                                                        hit: item,
                                                        attribute:
                                                            'vendor_city',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget_product_detail">
                                        ${components.Snippet({
                                            hit: item,
                                            attribute:
                                                'full_website_description',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </a>`
                    },
                    noResults() {
                        return 'We couldnt find anything :( Have a suggestion? share it here!'
                    },
                },
                getItemUrl({ item }) {
                    return '/product/' + item.product_url_slug
                },
            },
        ]
    },
})

document.addEventListener('keydown', (event) => {
    if (event.metaKey && event.key.toLowerCase() === 'k') {
        setIsOpen(true)
    }
})
