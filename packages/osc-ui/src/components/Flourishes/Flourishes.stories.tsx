import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { FlourishesProps } from './Flourishes';
import { Flourishes } from './Flourishes';
import { primary, secondary } from './patterns';

export default {
    title: 'osc-ui/Flourishes',
    component: Flourishes,
    parameters: {
        docs: {
            description: {
                component: 'Patterns of the Open Study College graphic elements.',
            },
        },
    },
    argTypes: {
        color: {
            options: [
                'primary',
                'secondary',
                'tertiary',
                'quaternary',
                'quinary',
                'senary',
                'septenary',
                'octonary',
                'nonary',
                'denary',
                'duodenary',
                'gradient-primary',
                'gradient-secondary',
                'gradient-tertiary',
                'gradient-quaternary',
                'gradient-quinary',
                'gradient-senary',
                'gradient-septenary',
                'gradient-octonary',
                'gradient-nonary',
                'multicolor',
            ],
            control: {
                type: 'select',
            },
        },
    },
} as Meta;
const Template: Story<FlourishesProps> = ({ ...args }) => (
    <div className="o-container" style={{ position: 'relative' }}>
        <Flourishes {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    color: 'gradient-senary',
    pattern: primary,
    variant: 'primary',
    children:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam exercitationem eos soluta, esse consequuntur quas ex labore distinctio. Obcaecati nisi eius nesciunt autem fugiat illum iure. Nulla voluptas adipisci vero. Natus iure pariatur dolor sapiente veritatis repudiandae qui odit rerum numquam, soluta perspiciatis, unde dignissimos voluptatibus repellat quo et eaque. Doloremque pariatur praesentium ullam voluptates iure ad ipsa eius vero. Asperiores doloremque officiis perferendis, animi assumenda eveniet repellendus ipsa distinctio! Esse reiciendis animi unde similique nobis at architecto obcaecati dolor quibusdam, harum, explicabo ut aut voluptatibus facere optio! Voluptates, quaerat! Obcaecati quia, eaque asperiores eius aspernatur, iste ducimus nihil, explicabo ullam illo aliquam alias est fugiat saepe natus labore odio corporis hic odit cupiditate culpa adipisci tempora a maiores! Molestias. Quas officiis corporis sequi rem. Voluptatem deserunt reiciendis neque totam dolores saepe doloremque expedita voluptatum officia! Architecto velit tempora quisquam, perferendis qui doloremque vitae sunt atque perspiciatis recusandae labore fuga? In quod pariatur sequi error cupiditate facere praesentium culpa, voluptate tempore explicabo vero est! Ad tempore at natus consectetur esse, tenetur illo itaque deserunt quod laudantium commodi eaque temporibus aspernatur? Consectetur quibusdam reiciendis reprehenderit. Provident possimus ipsam ut aut quaerat iusto fugit culpa architecto veniam cumque! Ullam perferendis numquam recusandae minima natus, asperiores optio fugiat quo hic expedita ex tempora! Officia nihil blanditiis omnis beatae quibusdam, repudiandae tenetur temporibus praesentium reprehenderit soluta aut, quaerat ratione numquam tempore eius expedita. Optio quia ex unde amet voluptatem ratione atque fugiat cupiditate consequatur. Rem non fuga itaque repellat animi excepturi dolore. Vero laborum quibusdam alias explicabo velit odit, praesentium qui eligendi sed tempora iste distinctio vitae error expedita corporis necessitatibus adipisci ea repellendus. Vel, alias laborum hic cum, repellendus quos non cupiditate deserunt quisquam est, harum at animi sint iste repudiandae et odit reiciendis tempore facilis tenetur aspernatur totam illum nemo quasi. Cum! Sequi sapiente dolor a ullam quos quas dolores provident iure voluptate sint eos aspernatur eveniet repellat libero eaque ipsam distinctio consequuntur, doloremque facere dolore quod molestias ut. Iste, praesentium magnam! Tempore dolorem dicta eius veritatis provident eligendi, error ullam praesentium nemo neque similique aperiam odio dignissimos? Excepturi voluptas sunt rem amet consectetur. Dicta, tempora! Perferendis iste dolore magni quisquam laborum? Quasi, molestiae sed? Consequatur quam, nesciunt sit quisquam eius facere, rerum, nisi aspernatur totam quas odit nemo unde odio. Minima numquam harum provident reiciendis ea nobis dolores quod quas tempora? Eos nesciunt labore incidunt similique quidem doloribus pariatur repellendus repudiandae consequuntur a quisquam facilis officiis eum obcaecati sunt, dolorem porro. At corporis exercitationem voluptatum quia sapiente cumque numquam vero vitae. Assumenda amet commodi, similique repellat cumque omnis mollitia culpa a. Facilis asperiores fuga, accusantium minima labore, distinctio molestias provident amet porro natus quo libero quia odio? Nam molestias natus non? Excepturi, eos commodi? Quo odit animi illo doloremque nulla minima iusto, in enim ullam nemo eius corrupti nesciunt cum minus nam natus vero hic voluptatum aspernatur! Deleniti placeat a aspernatur! Libero cum fugit labore natus iusto doloremque quia omnis id doloribus illo quasi dolor, quisquam ullam temporibus placeat voluptas, numquam culpa dolorum aut sequi nam fugiat. Odit tempore totam repellendus? Ratione fugiat quos, deserunt optio saepe magnam amet provident explicabo quo id ut vitae velit iure. Iure voluptatibus sint, quidem voluptates blanditiis praesentium magni, provident asperiores assumenda unde, reprehenderit modi. Suscipit porro, et cumque quos aperiam aut distinctio a quam totam, necessitatibus quisquam? Sed ea cum illum reiciendis necessitatibus ad beatae error nisi dolorum sit minus voluptas, laboriosam distinctio voluptate! Atque corrupti, dolorum optio similique consectetur sit cum quos voluptates enim suscipit, provident ipsum maiores, numquam nostrum illo quod nulla a ipsam earum eligendi iusto sapiente. Unde natus rem ducimus. Autem animi maxime enim perferendis! Inventore, veritatis voluptates sit quaerat totam ea suscipit vero dolorum ipsum, fugit fugiat. Sint nostrum ipsa quidem repudiandae vitae, quisquam veniam facilis perspiciatis. Odio, quo. Earum, dolore incidunt sit aliquam repellat ex itaque et aspernatur, voluptates doloremque dignissimos perspiciatis sequi aliquid ratione velit assumenda saepe. Fuga qui iste aliquam similique ex officia. Maiores, voluptatum qui? Eaque, exercitationem commodi. Illo autem corporis repudiandae dolorum quidem et facere cupiditate, quasi repellat nisi in enim, ea dignissimos sit sed earum quod? Ullam quod eum asperiores cum hic maiores. Tempore, ipsam. Iste, ducimus doloribus aperiam alias veniam cum dolorem sed earum, quasi illum enim reprehenderit, voluptas labore. Asperiores fugit recusandae saepe! Facere magnam, inventore corrupti accusamus aut assumenda aperiam! Nihil dolorum architecto rerum! Eos iusto facere placeat deleniti quas distinctio eveniet aspernatur ex aut magni. Culpa dicta libero vitae dolores illum sequi, cupiditate facere porro, ullam ea distinctio incidunt. Placeat molestiae dolores, eius alias mollitia laudantium ab illum provident autem et commodi quo nobis iusto esse quis sed incidunt consectetur optio! Non, nobis consectetur quae atque debitis iusto mollitia! Atque minus unde alias, beatae impedit neque provident corrupti totam non officiis mollitia facere voluptate fugiat? A, laudantium accusantium! Quae atque, incidunt consectetur sit autem corrupti libero eius qui totam. Error voluptatem repellat aspernatur exercitationem, nemo, ea dignissimos dolorum repellendus voluptatibus animi a, incidunt magnam laboriosam. Alias eos aut numquam doloribus expedita veritatis ut odio repellendus fugit odit? Ducimus, alias. Corrupti dolorum, dolor perferendis facilis maxime repellat expedita asperiores, nihil quibusdam voluptatem quam est error minus officia provident officiis aut voluptates eius sunt optio atque vero iste modi? A, recusandae? Corrupti non nesciunt quaerat ea vel suscipit ratione nostrum laudantium, fugit adipisci eligendi sapiente, nihil atque numquam! Libero, deleniti voluptatibus. Recusandae dolorem similique saepe nulla sequi quasi perspiciatis distinctio vero. Molestias quasi consectetur architecto impedit excepturi laborum, nisi, aliquid nihil ab ullam, non odio aspernatur sapiente dicta! Error delectus quam ab laboriosam repudiandae laudantium voluptatibus distinctio labore praesentium. Officia, assumenda. Cum quae labore illo. Soluta ipsa nihil facilis aliquam suscipit minus sint qui cumque deleniti. Autem ipsa, unde distinctio neque incidunt quia, minima accusamus placeat quo tempore non ab modi! Labore, voluptas repellat nesciunt eius magni omnis beatae incidunt illum nobis laborum, saepe aut exercitationem. Expedita, eius aspernatur, accusantium inventore in possimus aperiam dolores nemo tempora perspiciatis esse quidem at. Tenetur dolores aliquid soluta quaerat incidunt, nemo nisi nulla? Reiciendis consectetur odit doloribus maiores illo reprehenderit? Maxime quia consequuntur amet minima autem voluptatibus deleniti corporis architecto. Pariatur illum neque expedita. Hic repellat dolores unde accusamus culpa neque rem dolore veritatis nam, consectetur illum nobis corrupti excepturi numquam officia consequatur nihil quos explicabo laudantium voluptates eligendi ex cumque deleniti earum. Dolore? Impedit dolore unde harum deserunt error nostrum? Laborum qui itaque, labore eius quia minima a molestiae, maiores at quo minus natus sequi blanditiis commodi accusantium ipsum sed, maxime necessitatibus id. Commodi incidunt dolor eaque iste tempore, minus suscipit doloremque reiciendis facere itaque vitae soluta ut minima, maxime voluptatibus unde accusamus porro ducimus vero corporis provident eum dolorem? Ex, ut deserunt. Distinctio numquam veritatis quo error eaque facilis alias, non dolor mollitia est temporibus aut accusamus. In, quasi sit reiciendis nulla, veritatis iste, impedit suscipit alias quisquam ducimus eveniet veniam saepe? Saepe asperiores tempora sint repudiandae obcaecati, quaerat beatae commodi fuga ut odio doloribus optio quae, aspernatur laboriosam molestias pariatur magnam mollitia assumenda sed voluptatibus. Quam voluptas saepe illo expedita reprehenderit. Facere, minus odio ipsam nam ullam iure ad ipsa sapiente? Iste nemo excepturi aut accusantium impedit! Quas velit perferendis eos, ut accusamus doloremque modi? Sunt totam iure facere commodi optio! Accusamus voluptas iusto ea perferendis at libero corrupti quibusdam quae, natus unde, tempora porro! Soluta suscipit cum illo magni iure, excepturi voluptatum vero aspernatur maiores tempore doloremque velit natus ratione. Eius ducimus quidem vitae odio quos fugit ea nobis aliquid delectus commodi quo minima exercitationem assumenda, doloremque quam, voluptates omnis provident vero dolor ad tempora placeat. Officia ipsam laudantium reprehenderit. Eaque, quasi! Placeat debitis ipsum nesciunt quis soluta aliquid expedita ex vero non illo! Voluptate reprehenderit error impedit natus, earum minus asperiores ad veritatis a aut corrupti eius veniam totam? Cum est temporibus neque explicabo, debitis hic rerum culpa accusamus illum inventore accusantium nihil. Explicabo quibusdam quis impedit labore esse dolor necessitatibus expedita qui ducimus. Facere porro eius consectetur fugiat. Culpa sed tempore aperiam ullam, corporis facilis nobis explicabo amet aspernatur officia esse reprehenderit obcaecati, labore quasi similique suscipit eos repudiandae voluptas! Quam similique corporis, exercitationem quidem cum ratione fugiat? Perferendis iste, accusantium provident aperiam adipisci animi delectus corrupti distinctio nam est ipsum veniam amet laboriosam repellat dolor quaerat, ratione, nulla reprehenderit tempora dicta! Earum praesentium veritatis incidunt placeat deleniti. In dolor sed praesentium tempore non accusamus magnam veniam fuga nostrum itaque? Quia repellendus natus molestiae quam perspiciatis quibusdam aperiam ratione dolorum voluptatum fuga accusamus amet pariatur, nostrum minus officia. Voluptate magni, et voluptas tempora aperiam facere saepe nam quia! Ullam eius dolores tempore enim, maiores porro magnam corrupti vero, quibusdam at commodi sapiente provident explicabo. Eum eius minima reiciendis? Officiis quia iusto pariatur, adipisci minima omnis ea earum nihil quaerat voluptas, saepe ut odit impedit molestiae? Voluptatum rerum hic accusantium dicta natus consectetur molestias quod magnam perspiciatis. A, nam? Maxime aspernatur provident voluptatem dolorum molestias a, quis minima eos, sunt tempore ratione, illum commodi sit excepturi laborum facere. Error dolor aliquam ullam ipsum repudiandae amet, maiores rem ab dolorem.',
};
export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    pattern: secondary,
    variant: 'secondary',
};
