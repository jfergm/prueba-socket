import axios from 'axios';

const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const getShipments = async () => {

  try {
    const data = await axios({
      method: 'get',
      url: `http://${process.env.QUERY_ENDPOINT}/guide/${month}/${year}`,
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    })
    return data.data.data
  } catch(e) {
    console.log(e)
  }

  return []
}

const countShipments = async () => {
  const shipments = await getShipments();

  return await shipments.length;
}

export default getShipments;

export { countShipments };