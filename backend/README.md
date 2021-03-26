# Ad Server Backend

## Existing Routes

### Create new ad
`POST /ads`
params: clickThrough, textOverlay, tags, campaign, adImage
Post a multipart form to create a new ad:
```
<form action="/ads" enctype="multipart/form-data" method="POST">
    <input type="text" name="clickThrough"/>
    <input type="text" name="textOverlay"/>
    <input type="text" name="tags"/>
    <input type="text" name="campaign"/>
    <input type="file" name="adImage" accept="image/*" />
    <input type="submit" value="Upload Photo"/>
</form>
```

Places the id of the newly created ad in the location field


### Get ad by id
`GET /ads/:id`

### Get ad image
`GET /images/:id`

Where id is the id of the image, which is not the same as the ad id.
returns JSON.
```
{
    "_id":"5fada58953d922087116d366",
    "image":"/images/5fada58953d922087116d365",
    "clickThrough":"This",
    "textOverlay":"is",
    "tags":"a",
    "campaign":"test"
}
```


### Delete ad by id
`DELETE /ads/:id`

### List existing ads
`GET /listads/:retrieved/:chunksize`
Returns a JSON list containing ads less than or equal in length to :chunksize, starting at :retrieved.
Retrieved and chunksize allow pagination. TODO: add total ads to be retrieved.

### Create a new campaign
`POST /campaigns` params: campaignTitle, startTime, endTime, description. Fill out the form to create a new campaign:
```
            <form action="/campaigns" method="POST">
                <label for="campaignTitle">Campaign Title</label>
                <input type="text" name="campaignTitle" />
                <label for="startTime">Start Time</label>
                <input type="text" name="startTime" />
                <label for="endTime">End Time</label>
                <input type="text" name="endTime" />
                <label for="description">Description</label>
                <input type="text" name="description" />
                <input type="submit" value="Submit Campaign"/>
            </form>

```
### Get campaign by id
`GET /campaigns/:id`

### DELETE campaign by id
`DELETE /campaign/:id`

## Database Schema

- db 'ads'
    + collection 'ads'
    + collection 'images'
    + collection 'campaigns'
