<?php

namespace Unit\Support\Lotteries;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\LotteryGameWayBetMethod;
use App\Supports\Lotteries\LotterySscSupport;

use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class LotterySscSupportTest extends TestCase
{ //class Start

    public function testPrepareData()
    {
        //Code here
    }

    /**
     *
     * 測試根據不同玩法算出中奖号码
     *
     * @return void
     * @date   2017-11-10
     * Author  Rex
     */
    public function testGetWinNumber()
    {

        $this->zhixuanWinNumber(); //時時彩直選中奖号码
        $this->wuxingZuxuanWinNumber(); //时时彩五星组选中奖号码
        $this->siingZuxuanWinNumber(); //时时彩四星组选中奖号码
        // $this->saningZuxuanWinNumber(); //时时彩三星组选中奖号码

    }

    /**
     *
     * 測試使用投注號碼算出注數
     *
     * @return void
     * @date   2017-11-04
     * Author  Rex
     */
    public function testGetBetCountByNum()
    {

        //時時彩五星直選玩法
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zhixuan_fs")->first();

        # Case 1, Start
        //時時彩五星直選玩法
        $sBetNumber = "1|2|3|4|5";
        $iExpectCount = 1;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //時時彩五星直選玩法
        $sBetNumber = "1|1,2|1,3|1,4|1,5";
        $iExpectCount = 16;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 2, End

        # Case 3, Start
        //時時彩五星直選玩法
        $sBetNumber = "1,2,3,4,5,6,7,8,9,0|1,2,3,4,5,6,7,8,9,0|1,2,3,4,5,6,7,8,9,0|1,2,3,4,5,6,7,8,9,0|1,2,3,4,5,6,7,8,9,0";
        $iExpectCount = 100000;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 4, End

        # Case 5, Start
        //時時彩五星直選玩法
        $sBetNumber = "4,5|4,5,6|4,5,7|4,5,8|4,5,9";
        $iExpectCount = 162;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 5, End

        //时时彩前四直选复式
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zhixuan_fs")->first();

        # Case 1, Start
        //时时彩前四直选复式
        $sBetNumber = "0,1,2|0,1,2|0,1,2|0,1,2";
        $iExpectCount = 81;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //时时彩前四直选复式
        $sBetNumber = "1,5|2,4,6,7,9|0,1,2,3,4,5,6,7,8,9|2,3,8";
        $iExpectCount = 300;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 2, End

        //时时彩五星组选120
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_120")->first();

        # Case 1, Start
        //时时彩五星组选120
        $sBetNumber = "1,2,3,4,5";
        $iExpectCount = 1;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //时时彩五星组选120
        $sBetNumber = "1,2,3,4,5,6,7,8";
        $iExpectCount = 56;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 2, End

        # # Case 3, Start
        //时时彩五星组选120
        $sBetNumber = "1,2,3,4,5,6,7,8,9,0";
        $iExpectCount = 252;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 3, End

        //时时彩五星组选60
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_60")->first();

        # Case 1, Start
        //时时彩五星组选60
        $sBetNumber = "1|4,2,3";
        $iExpectCount = 1;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx60';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //时时彩五星组选60
        $sBetNumber = "1|2,3,4,5,6";
        $iExpectCount = 10;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx60';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 2, End

        # Case 3, Start
        //时时彩五星组选60
        $sBetNumber = "1,2,3|2,3,4,5,6";
        $iExpectCount = 18;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx60';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 3, End

        # Case 4, Start
        //时时彩五星组选60
        $sBetNumber = "1,2,3,6,7,8|2,3,4,5,6,7,8";
        $iExpectCount = 135;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx60';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 4, End

        //时时彩五星组选30
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_30")->first();

        # Case 1, Start
        //时时彩五星组选30
        $sBetNumber = "2,3|3,4";
        $iExpectCount = 1;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx30';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //时时彩五星组选30
        $sBetNumber = "2,3,4,5|3,4,6,7";
        $iExpectCount = 18;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx30';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 2, End

        # Case 3, Start
        //时时彩五星组选30
        $sBetNumber = "0,1,2,3,4,5,6,7,8|0,1,2,3,4,5,6,8,9";
        $iExpectCount = 260;
        $sWinFunction = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iUniqueCount = $oLotteryGameWayBetMethod->unique_count;
        $sWinFunction = 'combin_zx30';

        $iBetCount = LotterySscSupport::getBetCountByNum($sBetNumber, $sWinFunction, $iDigitalCount, $iUniqueCount);

        $this->assertEquals($iExpectCount, $iBetCount);
        # Case 3, End

    }


    /**
     *
     * 測試時時彩直選玩法所有中獎號碼
     *
     * @return void
     * @date   2017-11-09
     * Author  Rex
     */
    private function zhixuanWinNumber() {

        #====時時彩直選玩法==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zhixuan_fs")->first();

        # Case 1, Start
        # 時時彩五星直選玩法
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "2|3|4|5|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====時時彩五星直選玩法==== End


        #====时时彩前四直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zhixuan_fs")->first();

        # Case 1, Start
        //時時彩前四直選玩法
        $sInputWinNumber = "2,1,4,5,1";
        $sExpectWinNumber = "2|1|4|5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End

        # Case 2, Start
        //時時彩前四直選玩法
        $sInputWinNumber = "2,2,3,5,1";
        $sExpectWinNumber = "2|2|3|5";

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2, End
        #====时时彩前四直选复式==== End


        #====时时彩后四直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housi_zhixuan_fs")->first();

        # Case 1, Start
        //時時彩后四直選玩法
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "3|4|5|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====时时彩后四直选复式==== Emd


        #====时时彩中三直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"zhongsan_zhixuan_fs")->first();

        //时时彩中三直选复式
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "3|4|5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====时时彩中三直选复式==== End


        #====时时彩后三直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housan_zhixuan_fs")->first();

        //时时彩后三直选复式
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "4|5|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====时时彩后三直选复式==== End


        #====时时彩二星前二直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"erxing_zhixuan_qianerfs")->first();

        //时时彩二星前二直选复式
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "2|3";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====时时彩二星前二直选复式==== End


        #====时时彩二星后二直选复式==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"erxing_zhixuan_chouerfs")->first();

        //时时彩二星后二直选复式
        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "5|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1, End
        #====时时彩二星后二直选复式==== End

    }

    /**
     *
     * 測試時時彩五星组选玩法所有中獎號碼
     *
     * @return void
     * @date   2017-11-09
     * Author  Rex
     */
    private function wuxingZuxuanWinNumber()
    {

        #====时时彩五星组选120==== Start
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_120")->first();

        $sInputWinNumber = "2,3,4,5,1";
        $sExpectWinNumber = "1,2,3,4,5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        #====时时彩五星组选120==== End


        #====时时彩五星组选60==== Start
        # 单二重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_60")->first();

        # Case 1 Start
        $sInputWinNumber = "1,2,3,5,1";
        $sExpectWinNumber = "1|2,3,5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "1,2,2,5,1";
        $sExpectWinNumber = "-1|-1,-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End

        # Case 3 Start
        $sInputWinNumber = "1,1,2,5,1";
        $sExpectWinNumber = "-1|-1,-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 3 End

        # Case 4 Start
        $sInputWinNumber = "1,1,1,5,1";
        $sExpectWinNumber = "-1|-1,-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 4 End
        #====时时彩五星组选60==== End


        #====时时彩五星组选30==== Start
        # 双二重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_30")->first();

        # Case 1 Start
        $sInputWinNumber = "1,2,2,5,1";
        $sExpectWinNumber = "1,2|5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "1,3,2,5,1";
        $sExpectWinNumber = "-1,-1|-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩五星组选30==== Start


        #====时时彩五星组选20==== Start
        # 单三重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_20")->first();

        # Case 1 Start
        $sInputWinNumber = "2,2,2,5,1";
        $sExpectWinNumber = "2|1,5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,2,1";
        $sExpectWinNumber = "-1|-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩五星组选20==== Start

        #====时时彩五星组选10==== Start
        # 单三重号 + 单二重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_10")->first();

        # Case 1 Start
        $sInputWinNumber = "2,2,1,2,1";
        $sExpectWinNumber = "2|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,2,1";
        $sExpectWinNumber = "-1|-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩五星组选10==== Start


        #====时时彩五星组选5==== Start
        # 单四重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"wuxing_zuxuan_5")->first();

        # Case 1 Start
        $sInputWinNumber = "2,2,2,5,1";
        $sExpectWinNumber = "-1|-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,2,1";
        $sExpectWinNumber = "2|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩五星组选5==== Start
    }

    /**
     *
     * 測試時時彩四星组选玩法所有中獎號碼
     *
     * @return void
     * @date   2017-11-09
     * Author  Rex
     */
    private function siingZuxuanWinNumber()
    {

        #====时时彩前四组选24==== Start
        # 四单一重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zuxuan_24")->first();

        # Case 1 Start
        $sInputWinNumber = "2,1,3,5,3";
        $sExpectWinNumber = "1,2,3,5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,2,1";
        $sExpectWinNumber = "-1,-1,-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩前四组选24==== Start


        #====时时彩前四组选12==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zuxuan_12")->first();

        # Case 1 Start
        $sInputWinNumber = "2,1,3,3,3";
        $sExpectWinNumber = "3|1,2";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,3,1";
        $sExpectWinNumber = "-1|-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩前四组选12==== Start


        #====时时彩前四组选6==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zuxuan_6")->first();

        # Case 1 Start
        $sInputWinNumber = "2,2,3,3,3";
        $sExpectWinNumber = "2,3";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,3,1";
        $sExpectWinNumber = "-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩前四组选6==== Start


        #====时时彩前四组选4==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"qiansi_zuxuan_4")->first();

        # Case 1 Start
        $sInputWinNumber = "2,3,3,3,3";
        $sExpectWinNumber = "3|2";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,3,3,1";
        $sExpectWinNumber = "-1|-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩前四组选6==== Start




        #====时时彩后四组选24==== Start
        # 四单一重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housi_zuxuan_24")->first();

        # Case 1 Start
        $sInputWinNumber = "2,1,3,5,2";
        $sExpectWinNumber = "1,2,3,5";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,2,1";
        $sExpectWinNumber = "-1,-1,-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩后四组选24==== Start


        #====时时彩后四组选12==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housi_zuxuan_12")->first();

        # Case 1 Start
        $sInputWinNumber = "2,1,4,3,3";
        $sExpectWinNumber = "3|1,4";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,3,1";
        $sExpectWinNumber = "2|1,3";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩后四组选12==== Start


        #====时时彩后四组选6==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housi_zuxuan_6")->first();

        # Case 1 Start
        $sInputWinNumber = "2,2,3,2,3";
        $sExpectWinNumber = "2,3";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,2,3,1";
        $sExpectWinNumber = "-1,-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩后四组选6==== Start


        #====时时彩后四组选4==== Start
        # 单双重号
        $oLotteryGameWayBetMethod = LotteryGameWayBetMethod::where('identifier',"housi_zuxuan_4")->first();

        # Case 1 Start
        $sInputWinNumber = "2,1,3,3,3";
        $sExpectWinNumber = "3|1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 1 End

        # Case 2 Start
        $sInputWinNumber = "2,2,3,3,1";
        $sExpectWinNumber = "-1|-1";
        $sWinFunction  = $oLotteryGameWayBetMethod->wn_function;
        $iDigitalCount = $oLotteryGameWayBetMethod->digital_count;
        $iWinLength    = $oLotteryGameWayBetMethod->win_length;
        $sPosition     = $oLotteryGameWayBetMethod->position;

        $iBetCount = LotterySscSupport::getWinNumber($sInputWinNumber, $sWinFunction, $iDigitalCount, $iWinLength, $sPosition);

        $this->assertEquals($sExpectWinNumber, $iBetCount);
        # Case 2 End
        #====时时彩后四组选6==== Start

    }



} //class End
