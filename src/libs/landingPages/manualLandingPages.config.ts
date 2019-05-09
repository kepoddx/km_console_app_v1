import * as path from 'path'
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const assetsDir = path.join(process.cwd(), '_assets')

export interface ManualPage {
    site: string;
    name: string;
    ionLink: string;
    stories: ManualStory[];
}

export interface ManualStory {
    title: string;
    storyLink: string;
    imageLink: string;
    video?: string;
}

const pages: ManualPage[] = [
    {
        site: "knoxville",
        name: "Knox Biz",
        ionLink: "",
        stories: [
            {
                "title": "Knoxville’s Chamber has a new CEO",
                "storyLink": "https://www.knoxnews.com/story/money/business/2019/03/26/knoxville-chamber-taps-new-ceo-round-rock-texas/3275362002/",
                "imageLink": "https://www.gannett-cdn.com/presto/2019/03/26/PKNS/693df878-7b25-4d3c-a446-9a36a9dfbdf6-DSC_1882.JPG"
            },
            {
                "title": "Peek inside the new Courtyard and Residence Inn",
                "storyLink": "https://www.knoxnews.com/story/money/business/2019/03/26/downtown-knoxville-hotels-courtyard-and-residence-inn-marriott-opens/3266740002/",
                "imageLink": "https://www.gannett-cdn.com/presto/2019/03/25/PKNS/94b7fe9b-9ed1-4c9c-a4e3-f880abfda380-KNS-NEWHOTEL-0327_272.JPG"
            },
            {
                "title": "K Brew opening a location in West Hills",
                "storyLink": "https://www.knoxnews.com/story/money/business/2019/03/23/knoxville-k-brew-coffee-opens-west-hills-kingston-pike-location-starbucks/3236109002/",
                "imageLink": "https://www.gannett-cdn.com/presto/2019/03/22/PKNS/4915b4f7-b184-40e5-9206-e5c37d5b75bf-KBREW0327_0012.JPG"
            },
            {
                "title": "South High School primed to become senior housing",
                "storyLink": "https://www.knoxnews.com/story/money/business/2019/03/15/south-high-become-senior-housing-under-developer-rick-dovers-plan/3154576002/",
                "imageLink": "https://www.gannett-cdn.com/presto/2018/08/08/PKNS/08881f83-b466-4ed4-84a2-c1444b31655a-schools.09.JPG"
            }
        ]
    },
    {
        site: "fortCollins",
        name: "Ted Bundy",
        ionLink: "https://gannett.postclickmarketing.com/Admin/Campaigns/Campaign.aspx?campID=18540",
        stories: [
            {
                title: "You asked: Coloradoan reporter Erin Udell's answers to questions about her Ted Bundy investigation ",
                storyLink: "https://www.coloradoan.com/story/news/2019/02/11/top-5-takeaways-our-ted-bundy-ama-reddit/2842141002/ ",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Ted Bundy: Could his killing spree have been stopped cold in Colorado? ",
                storyLink: "https://www.coloradoan.com/story/news/2019/02/07/ted-bundy-could-his-spree-have-ended-colorado/2731734002/ ",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Introducing 'Hunted,' a podcast about Ted Bundy's time terrorizing Colorado ",
                storyLink: "https://www.coloradoan.com/story/news/2019/01/31/ted-bundy-new-podcast-hunted-explores-crimes-ted-bundy-tapes-director-extremely-wicked-zac-efron/2710128002/ ",
                imageLink: "https://via.placeholder.com/319x184"
            },

        ]

    },
    {
        site: "memphis",
        name: "Bicentennial",
        ionLink: "https://gannett.postclickmarketing.com/Admin/Creative/55431",
        stories: [
            {
                title: "Memphis in May festival salutes Memphis movies ",
                storyLink: "https://www.commercialappeal.com/story/entertainment/2019/03/19/memphis-may-festival-movies-indie-memphis-craig-brewer-the-firm-hustle-flow/3206869002/",
                imageLink: "https://firebasestorage.googleapis.com/v0/b/gannett-db.appspot.com/o/memphis%2FImage%201.jpg?alt=media&token=aceab854-c2f9-440e-825d-d3407ae7e849",
            },
            {
                title: "Memphis in May to include Guinness world record attempt for longest picnic table ",
                storyLink: "https://www.commercialappeal.com/story/news/2019/03/06/memphis-may-guinness-world-record-attempt-longest-picnic/3079385002/",
                imageLink: "https://firebasestorage.googleapis.com/v0/b/gannett-db.appspot.com/o/memphis%2Fimage%202.JPG?alt=media&token=da72300b-7190-4d6e-b58e-7cabef6431e9",
            },
            {
                title: "Artist Evelina Dillon showcases painting during Memphis in May party at Pink Palace ",
                storyLink: "https://www.commercialappeal.com/story/news/2019/03/19/memphis-may-fine-arts-poster-artist-evelina-dillon/3216428002/",
                imageLink: "https://firebasestorage.googleapis.com/v0/b/gannett-db.appspot.com/o/memphis%2Fimage%203.JPG?alt=media&token=d7c9ae45-64e0-42c6-8e1c-b70736bc71de",
            },
            {
                title: "Memphis and Shelby County to kick off 'New Century of Soul' ",
                storyLink: "https://www.commercialappeal.com/story/news/2019/03/21/memphis-shelby-county-coin-bicentennial-celebration-a-new-century-soul/3228240002/",
                imageLink: "https://firebasestorage.googleapis.com/v0/b/gannett-db.appspot.com/o/memphis%2Fimage%204.JPG?alt=media&token=d9a1227c-5758-4c78-afb9-e6ff7d461720",
            },

        ]
    },
    {
        site: "asheville",
        name: "Prom Gallery",
        ionLink: "https://gannett.postclickmarketing.com/Admin/Creative/55789",
        stories: [
            {
                title: "Martin L. Nesbitt Discovery Academy",
                storyLink: "https://www.citizen-times.com/picture-gallery/news/local/2019/04/07/photos-buncombe-county-asheville-nesbitt-discovery-academy-2019-prom/3380259002/",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Progressive Education Program",
                storyLink: "https://www.citizen-times.com/picture-gallery/news/local/2019/04/07/photos-buncombe-county-asheville-nesbitt-discovery-academy-2019-prom/3380259002/",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Community High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-10-best-photos-reitz-prom-2019/3464387002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Charles D. Owen High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-harrison-high-school-the-greatest-prom-earth-2019/3467440002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Enka High Scool",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-10-best-photos-reitz-prom-2019/3464387002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Asheville High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-harrison-high-school-the-greatest-prom-earth-2019/3467440002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "North Buncombe High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-10-best-photos-reitz-prom-2019/3464387002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "AC Reynolds High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-harrison-high-school-the-greatest-prom-earth-2019/3467440002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "TC Roberson High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-10-best-photos-reitz-prom-2019/3464387002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Madison High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-harrison-high-school-the-greatest-prom-earth-2019/3467440002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Progressive Education Program",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-10-best-photos-reitz-prom-2019/3464387002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            },
            {
                title: "Clyde A. Erwin High School",
                storyLink: "https://www.courierpress.com/picture-gallery/news/2019/04/14/gallery-harrison-high-school-the-greatest-prom-earth-2019/3467440002/?utm_campaign=proms2019",
                imageLink: "https://via.placeholder.com/319x184"
            }
        ]
    },
    {
        site: "asheville",
        name: "True Crime",
        ionLink: "",
        stories: [


        ]
    }
]

export default class ManualLandingPagesConfig {

    getManualPages$() {
        return of(pages)
    }
    getManualPage$(pageName: string) {
        return of(pages)
            .pipe(
                map(pages => pages.filter(page => page.name === pageName))
            )
    }
    getPagesBySite$(siteName: string) {
        return of(pages)
            .pipe(
                map(pages => pages.filter(page => page.name === siteName))
            )
    }
}

