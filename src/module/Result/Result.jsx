import Container from "@components/container/Container";
import Header from "@components/header";
import { BASE_URL } from "@utils/constant/url";
import { setError } from "@utils/redux/slice/errorSlice";
import { actionFetchSong, actionSearchSong } from "@utils/redux/slice/songSlice";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@components/card";
import Modal from "@components/modal";

function ResultSearchModule() {
  const [showModal, setShowModal] = useState(false);
  const { song } = useSelector((state) => state);
  const dispatch = useDispatch()

  const openModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const loadMore = async () => {
    dispatch(actionFetchSong())
    try {
      const res = await (await axios.get(BASE_URL + song.search + '&limit=' + song.song.length * 2)).data
      dispatch(actionSearchSong({ data: res.results, search: song.search }))
    } catch (error) {
      dispatch(setError({ message: error.data.message }))
    }
  }

  const search = useCallback(async (value) => {
    try {
      const res = await (await axios.get(BASE_URL + value + '&limit=' + 5)).data
      dispatch(actionSearchSong({ data: res.results, search: value }))
    } catch (error) {
      dispatch(setError({ message: error.data.message }))
    }
    setShowModal(prev => prev = false)
  }, [])

  return (
    <Container title={"Result"}>
      {showModal && <Modal value={(e) => search(e)} close={openModal} />}
      <div className={` w-full min-h-screen bg-[#f8fafc] flex flex-col items-center ${showModal ? 'blur-sm' : 'blur-0'} `}>
        <Header search={openModal} />
        {song.search !== '' &&
          <section className="mt-6 flex gap-2 items-center ">
            <p>Search result for : </p>
            <h2 className={`text-purple-500 text-2xl font-bold `}>{song.search}</h2>
          </section>
        }
        {song?.song.length > 0 ?
            <section className="flex flex-col w-full mt-8 gap-5 py-4 px-2">
              {song?.song?.map(({ artistName, trackPrice, artworkUrl100, trackName, primaryGenreName }, i) => (
                <div key={i}>
                  <Card img={artworkUrl100} artist={artistName} title={trackName} genre={primaryGenreName} price={trackPrice} />
                </div>
              ))}
              <button onClick={loadMore} className="bg-gray-200 w-40 rounded-xl  right-0 mx-auto py-2 text-gray-500">Load More</button>
            </section>
          :
          <p className=" mt-20 text-2xl text-gray-600 font-bold">{!song.search ? 'Find something' : song.song.length + ' Found'}</p>
        }
      </div>
    </Container>
  );
}

export default ResultSearchModule;
