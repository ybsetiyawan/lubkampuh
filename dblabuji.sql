PGDMP          	        	    |         	   db_labuji    16.3    16.3 %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    50072 	   db_labuji    DATABASE     �   CREATE DATABASE db_labuji WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db_labuji;
                postgres    false            �            1259    50112    m_userdetail    TABLE       CREATE TABLE public.m_userdetail (
    id integer NOT NULL,
    user_id integer,
    name character varying(100),
    address text,
    phone_number character varying(20),
    email character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
     DROP TABLE public.m_userdetail;
       public         heap    postgres    false            �            1259    50111    m_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.m_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.m_customer_id_seq;
       public          postgres    false    220            �           0    0    m_customer_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.m_customer_id_seq OWNED BY public.m_userdetail.id;
          public          postgres    false    219            �            1259    58265 
   m_material    TABLE     f   CREATE TABLE public.m_material (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.m_material;
       public         heap    postgres    false            �            1259    58264    m_material_id_seq    SEQUENCE     �   CREATE SEQUENCE public.m_material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.m_material_id_seq;
       public          postgres    false    222            �           0    0    m_material_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.m_material_id_seq OWNED BY public.m_material.id;
          public          postgres    false    221            �            1259    50074    m_role    TABLE     a   CREATE TABLE public.m_role (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.m_role;
       public         heap    postgres    false            �            1259    50073    m_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.m_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.m_role_id_seq;
       public          postgres    false    216            �           0    0    m_role_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.m_role_id_seq OWNED BY public.m_role.id;
          public          postgres    false    215            �            1259    50083    m_user    TABLE     �   CREATE TABLE public.m_user (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role_id integer
);
    DROP TABLE public.m_user;
       public         heap    postgres    false            �            1259    50082    m_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.m_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.m_user_id_seq;
       public          postgres    false    218            �           0    0    m_user_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.m_user_id_seq OWNED BY public.m_user.id;
          public          postgres    false    217            -           2604    58268    m_material id    DEFAULT     n   ALTER TABLE ONLY public.m_material ALTER COLUMN id SET DEFAULT nextval('public.m_material_id_seq'::regclass);
 <   ALTER TABLE public.m_material ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            )           2604    50077 	   m_role id    DEFAULT     f   ALTER TABLE ONLY public.m_role ALTER COLUMN id SET DEFAULT nextval('public.m_role_id_seq'::regclass);
 8   ALTER TABLE public.m_role ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            *           2604    50086 	   m_user id    DEFAULT     f   ALTER TABLE ONLY public.m_user ALTER COLUMN id SET DEFAULT nextval('public.m_user_id_seq'::regclass);
 8   ALTER TABLE public.m_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            +           2604    50115    m_userdetail id    DEFAULT     p   ALTER TABLE ONLY public.m_userdetail ALTER COLUMN id SET DEFAULT nextval('public.m_customer_id_seq'::regclass);
 >   ALTER TABLE public.m_userdetail ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �          0    58265 
   m_material 
   TABLE DATA           .   COPY public.m_material (id, name) FROM stdin;
    public          postgres    false    222   �'       �          0    50074    m_role 
   TABLE DATA           *   COPY public.m_role (id, name) FROM stdin;
    public          postgres    false    216   *(       �          0    50083    m_user 
   TABLE DATA           A   COPY public.m_user (id, username, password, role_id) FROM stdin;
    public          postgres    false    218   W(       �          0    50112    m_userdetail 
   TABLE DATA           c   COPY public.m_userdetail (id, user_id, name, address, phone_number, email, created_at) FROM stdin;
    public          postgres    false    220   �(       �           0    0    m_customer_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.m_customer_id_seq', 2, true);
          public          postgres    false    219            �           0    0    m_material_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.m_material_id_seq', 16, true);
          public          postgres    false    221            �           0    0    m_role_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.m_role_id_seq', 2, true);
          public          postgres    false    215            �           0    0    m_user_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.m_user_id_seq', 4, true);
          public          postgres    false    217            7           2606    50120    m_userdetail m_customer_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.m_userdetail
    ADD CONSTRAINT m_customer_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.m_userdetail DROP CONSTRAINT m_customer_pkey;
       public            postgres    false    220            9           2606    50122 #   m_userdetail m_customer_user_id_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.m_userdetail
    ADD CONSTRAINT m_customer_user_id_key UNIQUE (user_id);
 M   ALTER TABLE ONLY public.m_userdetail DROP CONSTRAINT m_customer_user_id_key;
       public            postgres    false    220            ;           2606    58270    m_material m_material_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.m_material
    ADD CONSTRAINT m_material_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.m_material DROP CONSTRAINT m_material_pkey;
       public            postgres    false    222            /           2606    50081    m_role m_role_name_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.m_role
    ADD CONSTRAINT m_role_name_key UNIQUE (name);
 @   ALTER TABLE ONLY public.m_role DROP CONSTRAINT m_role_name_key;
       public            postgres    false    216            1           2606    50079    m_role m_role_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.m_role
    ADD CONSTRAINT m_role_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.m_role DROP CONSTRAINT m_role_pkey;
       public            postgres    false    216            3           2606    50088    m_user m_user_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.m_user DROP CONSTRAINT m_user_pkey;
       public            postgres    false    218            5           2606    50090    m_user m_user_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_username_key UNIQUE (username);
 D   ALTER TABLE ONLY public.m_user DROP CONSTRAINT m_user_username_key;
       public            postgres    false    218            =           2606    50123 $   m_userdetail m_customer_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.m_userdetail
    ADD CONSTRAINT m_customer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.m_user(id);
 N   ALTER TABLE ONLY public.m_userdetail DROP CONSTRAINT m_customer_user_id_fkey;
       public          postgres    false    4659    220    218            <           2606    50091    m_user m_user_role_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.m_role(id);
 D   ALTER TABLE ONLY public.m_user DROP CONSTRAINT m_user_role_id_fkey;
       public          postgres    false    4657    216    218            �   L   x�3�tJ,I�K�2�H�I,��O�IIMQ �R�2R�,�ʲBJs�j��RK��L9���\1z\\\ #h0      �      x�3�,-N-�2�L.-.��2c���� R�c      �   �   x�5�;�0  й=3P,�J����H�P)���|xLU3TJЬ\C�6�.ݶ��%b}�v�ߜ'�jд��]�,"z��G�l�� �C���齌])�#t����<a�	*��iWz|߅�W�����A0��]�� Ż-�      �     x�U��j�0E��W̾��d[��
�R�4!4)�t3N�#ے�b��UB�n�>�\N8�(|�a�xt:���݄��@�����V������"������񝟴k�F�6��MQYc=Q���/�O��+���9��\���sU�jQqr��D�9��E3У�D0Qd�e\�벪KEU�d�A
�8�`f�#��8��ٝ�����Y�Z�d)��6��A���~�Dy�"�YUq�T)ɀͲ�wf������U�UJ�t�I�$�Y6kA     