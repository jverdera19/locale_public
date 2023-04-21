const { autocomplete, getAlgoliaResults, getAlgoliaFacets } =
    window['@algolia/autocomplete-js']
const appId = '09BBTSQZXQ'
const apiKey = '099bc02c1366e54cb2e1e3975b0a8866'
const searchClient = algoliasearch(appId, apiKey)
const indexName = 'BA Products'
const vendorIndexName = 'BA Vendors'

const { setIsOpen } = autocomplete({
    container: '#autocomplete',
    placeholder: 'Find Products',
    detachedMediaQuery: '',
    openOnFocus: true,
    getSources({ query, state }) {
        if (!query) {
            return [
                {
                    sourceId: 'BA Products',
                    getItems() {
                        return [
                            {
                                Slug: 'ba-model-bakerys-famous-english-muffins-save-with-6-pack',
                                'Product Image':
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/6430a5f760288efb7c9742a8_KMuYX11Mu4I9H00t8rIH3uL7pHSVeoxXBLNjztazwn8.jpeg',
                                Vendor: 'Model Bakery',
                                Name: "Model Bakery's Famous English Muffins (Save $2 with 6 pack)",
                                'Servings & Quantity': '6 Muffins',
                                Location: 'Napa Valley, CA',
                                Description:
                                    "Model Bakery's Famous English Muffins are a beloved treat enjoyed by generations of customers. They are made with the …",
                                Price: '$19',
                            },
                        ]
                    },
                    templates: {
                        header() {
                            return 'Trending Dishes This Week'
                        },
                        item({ item, components, html }) {
                            return html`<a
                                class="aa-ItemLink"
                                href="/product/${item.Slug}"
                            >
                                <div class="widget_product">
                                    <a href="/product/${item.Slug}">
                                        <img
                                            class="widget_product_image_algolia"
                                            src="${item['Product Image']}"
                                            alt="${item.Name}"
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
                                                        attribute: 'Vendor',
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
                                                            attribute: 'Name',
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
                                                                        'Servings & Quantity',
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
                                                    ${item.Price}
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
                                                                'Location',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget_product_detail">
                                            ${components.Snippet({
                                                hit: item,
                                                attribute: 'Description',
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
                        return '/product/' + item.Slug
                    },
                },
                {
                    sourceId: 'BA Vendors',
                    getItems() {
                        return [
                            {
                                Vendor: 'Del Popolo',
                                vendor_slug: 'ba-del-popolo',
                                vendor_logo:
                                    'https://uploads-ssl.webflow.com/6226a2abeb906f60cc1f024c/640a59a180e661140c89fc00_YwIEULmPhtTkSFuaMJxAFwp98tTl1WqdOAxG0dN6_kg.png',
                            },
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
                                                data-src="${item.vendor_logo}"
                                                class="lazy entered loaded"
                                                data-ll-status="loaded"
                                                src="${item.vendor_logo}"
                                            />
                                        </div>
                                        <div class="pc_name">
                                            ${item.Vendor}
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
            ]
        }

        return [
            {
                sourceId: 'BA Vendors',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: vendorIndexName,
                                query,
                                params: {
                                    snippetEllipsisText: '…',
                                    hitsPerPage: 40,
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
                                            data-src="${item.vendor_logo}"
                                            class="lazy entered loaded"
                                            data-ll-status="loaded"
                                            src="${item.vendor_logo}"
                                        />
                                    </div>
                                    <div class="pc_name">
                                        ${item.Vendor}
                                    </div>
                                </div>
                            </a>
                        `
                    },
                    noResults() {
                        return 'No products for this query.'
                    },
                },
                getItemUrl({ item }) {
                    return '/vendor/' + item.vendor_slug
                },
            },
            {
                sourceId: 'BA Products',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: indexName,
                                query,
                                params: {
                                    attributesToSnippet: [
                                        'Name:10',
                                        'Description:15',
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
                            href="/product/${item.Slug}"
                        >
                            <div class="widget_product">
                                <a href="/product/${item.Slug}">
                                    <img
                                        class="widget_product_image_algolia"
                                        src="${item['Product Image']}"
                                        alt="${item.Name}"
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
                                                    attribute: 'Vendor',
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
                                                        attribute: 'Name',
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
                                                                'Servings & Quantity',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="widget_product_price_location"
                                        >
                                            <div class="pc_price">
                                                ${item.Price}
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
                                                        attribute: 'Location',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget_product_detail">
                                        ${components.Snippet({
                                            hit: item,
                                            attribute: 'Description',
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
                    return '/product/' + item.Slug
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
