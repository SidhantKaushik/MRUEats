import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Home.css';

const Home = (props) => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

    }, [user, navigate]);

    return (
        <div className='home'>
            <div id="categories">
                <div className='category'>
                    <img src='https://s3-alpha-sig.figma.com/img/a0b8/0422/fd559af13d71934c3b91f69958c34688?Expires=1668988800&Signature=aGsNRa-rfNsJXX1KZxtiGYJ~0~~q7vE4kFvFm7eBAiBv53s5IpjFn6bMgsUwRh1Mx9g4YDMagNLpYPCR6Tq3qZ2Uoi6GLyS52zElbfjaCRl7YKG07aWKHV6NtiUPnHxfRtlVHcxC9xp9zE92e5V2wa2J0Qnt~T7DSC-5HKFCwFFR~GBAVJya-D8CAJkCcvChKsjHP95E~LIUpDYO-legg9Nq3qifLSfB4VNaD2JtHEZVMVyz3dCH-I3Px3xL8jSdQTtVkzPwo7FM5~BnB-opcEarTntCNXB1y2YGN1kvIktPEsQD9cyovJ~Bsk63GiqjJc7~gO~4OKFJm3kbLfiiGg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img>
                </div>
                <div className='category'>
                    <img src='https://s3-alpha-sig.figma.com/img/143e/7b9c/69bf3bc848f9963fdd8c5ed570c27e1c?Expires=1668988800&Signature=S02I~kmfzmKuL4ZwUVA4rOO~XYzd1TTxtLA1YptA~9HJoCjvqpwPlUcAsgIXc~s3CCpZ9i~ZQGzrhhsVbyNw-lkLQi-lmLF9TqURA3-jeDXdoQkeNQtzqFmKe9SSTVXJ3lbZ3DMWME1HW7ZdyG2r54-njocNXGnlCJy-DzAOlHmkawmrFzbdVejYqdT0G-iSjyPMsgp1mjqPoflv4bR8H9xSPP1-4TdjXVmK2CZUKx46NgXucKaJekG0pPLkxmwyNvAaYt-H7U8IQIO3StY-jIe0gG3c~5zrXnLH8~5TT3mhvDfMi6Q4fQwN1UOsIKbdum36YL1aL7FPnv32wKbQjw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img>
                </div>
                <div className='category'>
                </div>
                <div className='category'></div>
            </div>
            <div id="search-box">
                <h2>Restaurants</h2>
                {/* <div id="tags">
                            <select>
                                <option value="Pizza">Pizza</option>
                                <option value="Midnight Snack">Midnight Snack</option>
                                <option value="Hot Drinks">Hot Drinks</option>
                                <option value="Energy">Energy</option>
                            </select>
                        </div> */}
                <Link to='/restaurantOrder'>
                    <div className='restaurants'>
                        <div className='logo'><img src='https://s3-alpha-sig.figma.com/img/fb70/ca6a/4b1bd450f3bb83cd16c2f3630170ce1e?Expires=1668988800&Signature=ZwsU8Fs3DeUXBXeut9bogfDxEvWaRDvxHF~py5GT6Vy8lr5lTwA0AeObdCT8zdVf-zvMy8WKTRzsOb4ckglEoyJwGun0dvmlGdRY32YPVmNF83CyzWGul2diG1DPBimVhz1plbDlIFddQ4t9nqh9p8O4mKcT8isp09tLt6uFdd1uf-4-J5gs1ykHXqU3dNc2Bg8AI3U1ykye21i47XaWDpsUDJU3HMXlQ8G2J1-PHgeh9GpDrebnQQ8MGOirjY8PI4y90zrBlgL3EPk-mfai1hGlmZbs4fA~qGBDE8lY6A2Aby~U26EwyTM3aRy46GF8BQRNL6C89aCFNgBjL2ICXw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></div>
                        <div className='info'> <h2>Booster Juice</h2>
                            <p>Smoothie place that sells some smoothies</p></div>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Home;